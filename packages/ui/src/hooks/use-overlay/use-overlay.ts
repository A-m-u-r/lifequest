import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { useClickOutside } from "../use-click-outside";
import { useEventListener } from "../use-event-listener";

export interface UseOverlayResult<T extends HTMLElement> {
  ref: RefObject<T | null>;
  isMounted: boolean;
  isClosing: boolean;
  onAnimationEnd: () => void;
}

export function useOverlay<T extends HTMLElement = HTMLDivElement>(
  isOpen: boolean,
  onClose: () => void,
  {
    closeOnOutside = true,
    closeOnEscape = true,
  }: { closeOnOutside?: boolean; closeOnEscape?: boolean } = {},
): UseOverlayResult<T> {
  const ref = useRef<T | null>(null);
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
    } else if (isMounted) {
      setIsClosing(true);
    }
  }, [isOpen, isMounted]);

  const close = useCallback(() => {
    if (isOpen) onClose();
  }, [isOpen, onClose]);

  const onKeyDown = useCallback(
    (event: Event) => {
      if (
        closeOnEscape &&
        !event.defaultPrevented &&
        (event as KeyboardEvent).key === "Escape"
      )
        close();
    },
    [close, closeOnEscape],
  );

  useEffect(() => {
    if (!isClosing) return;
    const style = ref.current ? getComputedStyle(ref.current) : null;
    const toMs = (part: string) =>
      parseFloat(part) * (part.trim().endsWith("ms") ? 1 : 1000);
    const durations = style?.animationDuration.split(",").map(toMs) ?? [0];
    const delays = style?.animationDelay.split(",").map(toMs) ?? [0];
    const duration = Math.max(
      0,
      ...durations.map(
        (value, index) => value + (delays[index % delays.length] ?? 0),
      ),
    );
    const timer = setTimeout(() => {
      setIsClosing(false);
      setIsMounted(false);
    }, duration + 50);
    return () => clearTimeout(timer);
  }, [isClosing]);

  const onAnimationEnd = () => {
    if (isClosing) {
      setIsClosing(false);
      setIsMounted(false);
    }
  };

  const onOutside = useCallback(() => {
    if (closeOnOutside) close();
  }, [closeOnOutside, close]);
  useClickOutside(ref, onOutside);
  useEventListener(
    "keydown",
    typeof window === "undefined" ? null : window,
    onKeyDown,
  );

  return { ref, isMounted, isClosing, onAnimationEnd };
}

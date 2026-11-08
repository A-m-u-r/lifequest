import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export function useEventListener<K extends keyof HTMLElementEventMap>(
  event: K,
  element: RefObject<HTMLElement | null> | Window | null,
  callback: (event: Event) => void,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const target = element && "current" in element ? element.current : element;
    if (!target) return;
    const handler = (event: Event) => callbackRef.current(event);
    target.addEventListener(event, handler);
    return () => target.removeEventListener(event, handler);
  }, [event, element]);
}

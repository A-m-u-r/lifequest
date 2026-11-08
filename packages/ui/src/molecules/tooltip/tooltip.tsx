import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties, FocusEvent, ReactNode } from "react";
import { classNames } from "../../libs/class-names";
import { withPortal } from "../../hocs/with-portal";
import css from "./tooltip.module.css";

export type TooltipPosition =
  "top" | "bottom" | "left" | "right" | "bottom_right" | "top_right";

export interface TooltipProps {
  children: ReactNode;
  text: ReactNode;
  position?: TooltipPosition;
  className?: string;
  style?: CSSProperties;
  contentClassName?: string;
}

interface TooltipBubbleProps {
  id: string;
  text: ReactNode;
  style: CSSProperties;
  className?: string;
}

const TooltipBubble = withPortal(function Bubble({
  id,
  text,
  style,
  className,
}: TooltipBubbleProps) {
  return (
    <div
      id={id}
      role="tooltip"
      className={classNames(css.ui_tooltip__bubble, {}, [className])}
      style={style}
    >
      {text}
    </div>
  );
});

function computeStyle(
  rect: DOMRect,
  position: TooltipPosition,
  bubble: DOMRect | undefined,
  gap: number,
): CSSProperties {
  const width = bubble?.width ?? 0;
  const height = bubble?.height ?? 0;
  let top: number;
  let left: number;

  switch (position) {
    case "bottom":
      top = rect.bottom + gap;
      left = rect.left + (rect.width - width) / 2;
      break;
    case "bottom_right":
      top = rect.bottom + gap;
      left = rect.right - width;
      break;
    case "top_right":
      top = rect.top - height - gap;
      left = rect.right - width;
      break;
    case "left":
      top = rect.top + (rect.height - height) / 2;
      left = rect.left - width - gap;
      break;
    case "right":
      top = rect.top + (rect.height - height) / 2;
      left = rect.right + gap;
      break;
    case "top":
    default:
      top = rect.top - height - gap;
      left = rect.left + (rect.width - width) / 2;
      break;
  }

  return {
    top: Math.max(gap, Math.min(top, window.innerHeight - height - gap)),
    left: Math.max(gap, Math.min(left, window.innerWidth - width - gap)),
  };
}

export function Tooltip({
  children,
  text,
  position = "top",
  className,
  style: wrapperStyle,
  contentClassName,
}: TooltipProps) {
  const tooltipId = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [bubbleStyle, setBubbleStyle] = useState<CSSProperties | null>(null);
  const isOpen = bubbleStyle !== null;
  const isElementTrigger = isValidElement<{ "aria-describedby"?: string }>(
    children,
  );

  const open = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const bubble = document.getElementById(tooltipId)?.getBoundingClientRect();
    const tokenGap = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--sp-2");
    const gap = parseFloat(tokenGap) || 8;

    setBubbleStyle(computeStyle(rect, position, bubble, gap));
  }, [position, tooltipId]);

  const close = useCallback(() => setBubbleStyle(null), []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      close();
    },
    [close],
  );

  function handleMouseLeave() {
    if (!triggerRef.current?.contains(document.activeElement)) close();
  }

  function handleBlur(event: FocusEvent<HTMLSpanElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  }

  useLayoutEffect(() => {
    if (!isOpen) return;
    open();
    window.addEventListener("scroll", open, true);
    window.addEventListener("resize", open);
    return () => {
      window.removeEventListener("scroll", open, true);
      window.removeEventListener("resize", open);
    };
  }, [isOpen, open, text]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  let trigger = children;
  if (isElementTrigger) {
    const describedBy =
      [children.props["aria-describedby"], isOpen ? tooltipId : undefined]
        .filter(Boolean)
        .join(" ") || undefined;
    trigger = cloneElement(children, { "aria-describedby": describedBy });
  }

  return (
    <span
      ref={triggerRef}
      className={classNames(css.ui_tooltip, {}, [className])}
      style={wrapperStyle}
      tabIndex={isElementTrigger ? undefined : 0}
      aria-describedby={!isElementTrigger && isOpen ? tooltipId : undefined}
      onMouseEnter={open}
      onMouseLeave={handleMouseLeave}
      onFocus={open}
      onBlur={handleBlur}
    >
      {trigger}
      {bubbleStyle && (
        <TooltipBubble
          id={tooltipId}
          text={text}
          style={bubbleStyle}
          className={contentClassName}
        />
      )}
    </span>
  );
}

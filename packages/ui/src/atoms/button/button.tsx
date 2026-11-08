import { useRef, useState } from "react";
import type { ButtonHTMLAttributes, PointerEvent, ReactNode } from "react";
import css from "./button.module.css";

export type ButtonVariant =
  "primary" | "secondary" | "tertiary" | "ghost" | "destructive" | "success";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isDisabled?: boolean;
  isPending?: boolean;
  isIconOnly?: boolean;
  disableRipple?: boolean;
  children?: ReactNode;
}

interface Ripple {
  key: number;
  x: number;
  y: number;
  size: number;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isDisabled = false,
  isPending = false,
  isIconOnly = false,
  disableRipple = false,
  disabled = false,
  type = "button",
  className,
  children,
  onPointerDown,
  ...rest
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleKey = useRef(0);
  const isUnavailable = disabled || isDisabled || isPending;

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    onPointerDown?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      disableRipple ||
      isUnavailable ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const diameter = Math.hypot(rect.width, rect.height) * 2;
    setRipples((previous) => [
      ...previous,
      {
        key: rippleKey.current++,
        size: diameter,
        x: event.clientX - rect.left - diameter / 2,
        y: event.clientY - rect.top - diameter / 2,
      },
    ]);
  };

  return (
    <button
      {...rest}
      type={type}
      disabled={isUnavailable}
      aria-busy={isPending}
      onPointerDown={handlePointerDown}
      className={[
        css.button,
        css[variant],
        css[size],
        fullWidth && css.full,
        isIconOnly && css.iconOnly,
        isPending && css.pending,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isPending && (
        <span className={css.loader} aria-hidden="true">
          <span className={css.spinner} />
        </span>
      )}
      <span className={css.content}>{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          aria-hidden="true"
          className={css.ripple}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          onAnimationEnd={() =>
            setRipples((previous) =>
              previous.filter((item) => item.key !== ripple.key),
            )
          }
        />
      ))}
    </button>
  );
}

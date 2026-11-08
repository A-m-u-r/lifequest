import type { ComponentPropsWithRef, CSSProperties } from "react";
import { classNames } from "../../libs/class-names";
import css from "./progress-circle.module.css";

export type ProgressCircleVariant =
  "primary" | "success" | "warning" | "error" | "info";

export interface ProgressCircleProps extends ComponentPropsWithRef<"div"> {
  value: number;
  variant?: ProgressCircleVariant;
  size?: number;
  strokeWidth?: number;
}

export function ProgressCircle({
  value,
  variant = "success",
  size = 180,
  strokeWidth = 10,
  children,
  className,
  style,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "aria-valuetext": ariaValueText,
  ...rest
}: ProgressCircleProps) {
  const percentage = Number.isNaN(value)
    ? 0
    : Math.min(100, Math.max(0, value));
  const diameter = Number.isFinite(size) ? Math.max(2, size) : 180;
  const thickness = Number.isFinite(strokeWidth)
    ? Math.min(diameter / 2, Math.max(1, strokeWidth))
    : Math.min(diameter / 2, 10);
  const center = diameter / 2;
  const radius = (diameter - thickness) / 2;
  const circleStyle = {
    "--progress-circle-size": `${diameter}px`,
    "--progress-circle-stroke": `${thickness}px`,
    ...style,
  } as CSSProperties;

  return (
    <div
      {...rest}
      className={classNames(css.root, {}, [css[variant], className])}
      style={circleStyle}
    >
      <svg
        className={css.ring}
        viewBox={`0 0 ${diameter} ${diameter}`}
        fill="none"
        role="progressbar"
        aria-label={ariaLabel ?? (ariaLabelledby ? undefined : "Прогресс")}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={ariaValueText}
      >
        <circle
          className={css.track}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={thickness}
        />
        <circle
          className={css.fill}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={thickness}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100 100"
          strokeDashoffset={100 - percentage}
          transform={`rotate(-90 ${center} ${center})`}
          opacity={percentage === 0 ? 0 : 1}
        />
      </svg>
      {children != null && <div className={css.content}>{children}</div>}
    </div>
  );
}

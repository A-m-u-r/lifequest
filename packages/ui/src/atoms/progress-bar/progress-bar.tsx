import type { HTMLAttributes } from "react";
import { classNames } from "../../libs/class-names";
import css from "./progress-bar.module.css";

export type ProgressBarColor =
  "primary" | "success" | "warning" | "error" | "info";

export interface ProgressBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color" | "children"
> {
  value: number;
  color?: ProgressBarColor;
}

export function ProgressBar({
  value,
  color = "primary",
  className,
  ...rest
}: ProgressBarProps) {
  const percentage = Number.isNaN(value)
    ? 0
    : Math.min(100, Math.max(0, value));

  return (
    <div
      {...rest}
      className={classNames(css.track, {}, [className])}
      role="progressbar"
      aria-label={
        rest["aria-label"] ?? (rest["aria-labelledby"] ? undefined : "Прогресс")
      }
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={classNames(css.fill, {}, [css[color]])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

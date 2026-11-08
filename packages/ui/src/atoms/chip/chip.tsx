import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "../../libs/class-names";
import css from "./chip.module.css";

export type ChipKind = "filter" | "status";
export type ChipStatus = "completed" | "in-progress" | "not-started" | "locked";
export type ChipTone =
  "primary" | "success" | "warning" | "error" | "info" | "neutral";
export type ChipVariant = "soft" | "outline" | "solid";
export type ChipSize = "sm" | "md";

export interface ChipProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "color" | "children"
> {
  children: ReactNode;
  kind?: ChipKind;
  selected?: boolean;
  status?: ChipStatus;
  tone?: ChipTone;
  variant?: ChipVariant;
  size?: ChipSize;
  disabled?: boolean;
}

const STATUS_TONE: Record<ChipStatus, ChipTone> = {
  completed: "success",
  "in-progress": "primary",
  "not-started": "neutral",
  locked: "neutral",
};

export function Chip({
  children,
  kind = "filter",
  selected = false,
  status = "not-started",
  tone,
  variant = "soft",
  size = "sm",
  disabled = false,
  className,
  ...rest
}: ChipProps) {
  const chipTone =
    tone ?? (kind === "status" ? STATUS_TONE[status] : "primary");
  const classes = classNames(
    css.chip,
    {
      [css.selected]: kind === "filter" && selected,
      [css.locked]: kind === "status" && status === "locked",
    },
    [css[kind], css[chipTone], css[variant], css[size], className],
  );

  if (kind === "status") {
    return (
      <span
        {...rest}
        className={classes}
        aria-disabled={disabled || rest["aria-disabled"]}
      >
        {children}
      </span>
    );
  }

  return (
    <button
      {...rest}
      type="button"
      className={classes}
      disabled={disabled}
      aria-pressed={selected}
    >
      {children}
    </button>
  );
}

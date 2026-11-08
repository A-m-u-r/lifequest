import type { ComponentPropsWithRef } from "react";
import { classNames } from "../../libs/class-names";
import css from "./block.module.css";

export type BlockVariant =
  "default" | "muted" | "primary" | "success" | "warning" | "info" | "coupon";
export type BlockPadding = "none" | "sm" | "md" | "lg";
export type BlockRadius = "sm" | "md" | "lg" | "xl" | "pill";

export interface BlockProps extends ComponentPropsWithRef<"div"> {
  variant?: BlockVariant;
  padding?: BlockPadding;
  radius?: BlockRadius;
}

export function Block({
  variant = "default",
  padding = "md",
  radius = "lg",
  className,
  children,
  ...rest
}: BlockProps) {
  return (
    <div
      {...rest}
      className={classNames(css.block, {}, [
        css[variant],
        css[`padding_${padding}`],
        css[`radius_${radius}`],
        className,
      ])}
    >
      {children}
    </div>
  );
}

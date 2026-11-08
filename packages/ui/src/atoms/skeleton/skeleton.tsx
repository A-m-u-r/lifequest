import type { CSSProperties } from "react";
import css from "./skeleton.module.css";

export interface SkeletonProps {
  border?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ width, height, border, className }: SkeletonProps) {
  const style: CSSProperties = { width, height, borderRadius: border };
  return (
    <div
      aria-hidden="true"
      style={style}
      className={[css.wrapper, className].filter(Boolean).join(" ")}
    />
  );
}

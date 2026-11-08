import type { SVGProps } from "react";

export interface LqSparkleIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function LqSparkleIcon({
  size = 20,
  color = "#2D68FF",
  style,
  ...rest
}: LqSparkleIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      color={color}
      aria-hidden="true"
      style={{ flexShrink: 0, ...style }}
      {...rest}
    >
      <path d="M12 2L14.2 8.8L21 11L14.2 13.2L12 20L9.8 13.2L3 11L9.8 8.8L12 2Z" />
    </svg>
  );
}

import type { SVGProps } from "react";

export interface LqUnderlineIconProps extends SVGProps<SVGSVGElement> {
  /** Width in pixels; the height preserves the 10:1 aspect ratio. */
  size?: number;
}

export function LqUnderlineIcon({
  size = 96,
  style,
  ...rest
}: LqUnderlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size / 10}
      viewBox="0 0 100 10"
      aria-hidden="true"
      style={{ flexShrink: 0, ...style }}
      {...rest}
    >
      <path
        d="M2 7 Q45 2 96 5"
        fill="none"
        stroke="#33C787"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

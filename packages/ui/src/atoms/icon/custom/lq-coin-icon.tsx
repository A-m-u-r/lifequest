import type { SVGProps } from "react";

export interface LqCoinIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function LqCoinIcon({ size = 20, style, ...rest }: LqCoinIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ flexShrink: 0, ...style }}
      {...rest}
    >
      <circle
        cx="12"
        cy="12"
        r="10.5"
        fill="#F59E0B"
        stroke="#FBBF24"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="8" fill="#D97706" opacity="0.35" />
      <polygon
        points="12,6.5 13.7,10 17.5,10.5 14.7,13.2 15.4,17 12,15.2 8.6,17 9.3,13.2 6.5,10.5 10.3,10"
        fill="#FFFBEB"
      />
    </svg>
  );
}

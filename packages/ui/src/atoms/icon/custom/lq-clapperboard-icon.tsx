import type { SVGProps } from "react";

export interface LqClapperboardIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function LqClapperboardIcon({
  size = 44,
  style,
  ...rest
}: LqClapperboardIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      style={{
        flexShrink: 0,
        filter: "drop-shadow(var(--shadow-icon))",
        ...style,
      }}
      {...rest}
    >
      <g transform="rotate(-8 24 24)">
        <rect x="6" y="10" width="36" height="8" rx="2.5" fill="#4F75FF" />
        <path d="M12 10 L17 10 L13 18 L8 18 Z" fill="#E0E7FF" />
        <path d="M23 10 L28 10 L24 18 L19 18 Z" fill="#E0E7FF" />
        <path d="M34 10 L39 10 L35 18 L30 18 Z" fill="#E0E7FF" />
        <rect x="6" y="18" width="36" height="22" rx="4" fill="#3B5BDB" />
        <polygon points="21,24 21,34 30,29" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

import type { ComponentPropsWithRef } from "react";
import css from "./avatar.module.css";
import { classNames } from "../../libs/class-names";

export interface AvatarPerson {
  name: string;
  initials: string;
  color?: string;
}

export interface AvatarProps extends ComponentPropsWithRef<"div"> {
  person: AvatarPerson;
  size?: number;
  ring?: boolean;
  className?: string;
}

export function Avatar({
  person,
  size = 36,
  ring = false,
  className,
  style,
  ...rest
}: AvatarProps) {
  const color = person.color ?? "var(--color-primary)";

  return (
    <div
      {...rest}
      role={rest.role ?? "img"}
      aria-label={rest["aria-label"] ?? person.name}
      className={classNames(css.ui_avatar, {}, [className])}
      title={rest.title ?? person.name}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: color,
        boxShadow: ring
          ? `0 0 0 2px var(--surface-base), 0 0 0 4px ${color}`
          : undefined,
        ...style,
      }}
    >
      {person.initials}
    </div>
  );
}

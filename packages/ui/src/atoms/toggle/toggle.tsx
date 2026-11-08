import { useState } from "react";
import type { HTMLAttributes } from "react";
import { RadioCards } from "../radio-card";
import type { RadioCardsCardProps } from "../radio-card";
import { classNames } from "../../libs/class-names";
import css from "./toggle.module.css";

export type ToggleVariant = "soft" | "outline" | "solid";
export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue" | "color"
> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  fullWidth?: boolean;
}

export type ToggleItemProps = Omit<
  RadioCardsCardProps,
  | "variant"
  | "color"
  | "layout"
  | "withCheck"
  | "renderBadge"
  | "badge"
  | "customBadge"
  | "fullWidth"
  | "readOnly"
>;

function Root({
  value,
  defaultValue = "",
  onChange,
  variant = "soft",
  size = "md",
  disabled = false,
  readOnly = false,
  required = false,
  name,
  fullWidth = false,
  className,
  children,
  ...rest
}: ToggleProps) {
  const [internal, setInternal] = useState(defaultValue);
  const active = value ?? internal;
  const setActive = (next: string) => {
    if (disabled || readOnly || active === next) return;
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };
  return (
    <RadioCards
      {...rest}
      name={name}
      value={active}
      onChange={setActive}
      disabled={disabled}
      required={required}
      aria-readonly={readOnly || undefined}
      data-readonly={readOnly || undefined}
      className={classNames(css.root, { [css.fullWidth]: fullWidth }, [
        css[variant],
        css[size],
        className,
      ])}
    >
      {children}
    </RadioCards>
  );
}

function Item({ className, children, ...rest }: ToggleItemProps) {
  return (
    <RadioCards.Card
      {...rest}
      className={classNames(css.item, {}, [className])}
    >
      {children}
    </RadioCards.Card>
  );
}

export const Toggle = Object.assign(Root, { Item });

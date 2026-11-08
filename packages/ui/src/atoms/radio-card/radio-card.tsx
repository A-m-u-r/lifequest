import { Icon } from "../icon";
import { useId } from "react";
import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import { classNames } from "../../libs/class-names";
import css from "./radio-card.module.css";

export type RadioCardVariant = "card" | "chip" | "tab";
export type RadioCardColor = "primary" | "warning";
export type RadioCardLayout = "vertical" | "horizontal";

export interface RadioCardProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type" | "children" | "size"
> {
  badge?: ReactNode;
  customBadge?: ReactNode;
  children?: ReactNode;
  variant?: RadioCardVariant;
  color?: RadioCardColor;
  layout?: RadioCardLayout;
  withCheck?: boolean;
  fullWidth?: boolean;
  /** Applied to the outer label. Other input attributes are forwarded to the radio. */
  style?: CSSProperties;
}

export function RadioCard({
  badge,
  customBadge,
  children,
  variant = "card",
  color = "primary",
  layout = "vertical",
  withCheck = false,
  fullWidth = false,
  className,
  style,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...inputProps
}: RadioCardProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = `${inputId}-label`;

  return (
    <label
      htmlFor={inputId}
      className={classNames(css.root, { [css.fullWidth]: fullWidth }, [
        className,
      ])}
      style={style}
    >
      <input
        {...inputProps}
        id={inputId}
        type="radio"
        className={css.input}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby ?? (ariaLabel ? undefined : labelId)}
      />
      <span
        className={classNames(css.panel, {}, [
          css[variant],
          css[color],
          css[layout],
        ])}
      >
        {badge && <span className={css.badge}>{badge}</span>}
        {customBadge != null && (
          <span className={css.customBadge}>{customBadge}</span>
        )}
        <span id={labelId} className={css.content}>
          {children}
        </span>
        {withCheck && (
          <span className={css.check} aria-hidden="true">
            <Icon name="check" size={12} />
          </span>
        )}
      </span>
    </label>
  );
}

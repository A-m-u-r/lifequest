import { createContext, useContext, useId } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { RadioCard } from "./radio-card";
import type {
  RadioCardColor,
  RadioCardLayout,
  RadioCardProps,
  RadioCardVariant,
} from "./radio-card";
import { classNames } from "../../libs/class-names";
import css from "./radio-card.module.css";

export interface RadioCardsBadgeState {
  value: string;
  checked: boolean;
  disabled: boolean;
}

export type RadioCardsBadgeRenderer =
  ReactNode | ((state: RadioCardsBadgeState) => ReactNode);

interface GroupOptions {
  variant?: RadioCardVariant;
  color?: RadioCardColor;
  layout?: RadioCardLayout;
  withCheck?: boolean;
  disabled?: boolean;
  required?: boolean;
  renderBadge?: RadioCardsBadgeRenderer;
}

interface RadioCardsContextValue extends GroupOptions {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const RadioCardsContext = createContext<RadioCardsContextValue | null>(null);

export interface RadioCardsProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "color">,
    GroupOptions {
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

export interface RadioCardsCardProps extends Omit<
  RadioCardProps,
  "name" | "checked" | "defaultChecked" | "value" | "onChange"
> {
  value: string;
  renderBadge?: RadioCardsBadgeRenderer;
}

function Root({
  value,
  onChange,
  name,
  variant,
  color,
  layout,
  withCheck,
  renderBadge,
  disabled = false,
  required = false,
  className,
  children,
  ...rest
}: RadioCardsProps) {
  const generatedName = useId();
  return (
    <RadioCardsContext.Provider
      value={{
        name: name ?? generatedName,
        value,
        onChange,
        variant,
        color,
        layout,
        withCheck,
        renderBadge,
        disabled,
        required,
      }}
    >
      <div
        {...rest}
        role="radiogroup"
        aria-label={
          rest["aria-label"] ??
          (rest["aria-labelledby"] ? undefined : "Выбор варианта")
        }
        aria-disabled={disabled || undefined}
        aria-required={required || undefined}
        className={classNames(css.group, {}, [className])}
      >
        {children}
      </div>
    </RadioCardsContext.Provider>
  );
}

function Card({
  value,
  children,
  disabled,
  required,
  variant,
  color,
  layout,
  withCheck,
  renderBadge,
  ...rest
}: RadioCardsCardProps) {
  const group = useContext(RadioCardsContext);
  if (!group)
    throw new Error("RadioCards.Card must be rendered inside RadioCards");

  const checked = group.value === value;
  const isDisabled = Boolean(group.disabled || disabled);
  const badgeRenderer = renderBadge ?? group.renderBadge;
  const customBadge =
    typeof badgeRenderer === "function"
      ? badgeRenderer({ value, checked, disabled: isDisabled })
      : checked
        ? badgeRenderer
        : undefined;

  return (
    <RadioCard
      {...rest}
      value={value}
      name={group.name}
      checked={checked}
      onChange={(event) => {
        if (event.currentTarget.checked) group.onChange(value);
      }}
      disabled={isDisabled}
      required={group.required || required}
      variant={variant ?? group.variant}
      color={color ?? group.color}
      layout={layout ?? group.layout}
      withCheck={customBadge != null ? false : (withCheck ?? group.withCheck)}
      customBadge={customBadge}
    >
      {children}
    </RadioCard>
  );
}

export const RadioCards = Object.assign(Root, { Card });

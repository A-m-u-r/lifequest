import type { ChangeEvent, ComponentPropsWithRef, ReactNode } from "react";
import { classNames } from "../../libs/class-names";
import css from "./radio.module.css";

export interface RadioProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type" | "onChange" | "children" | "size"
> {
  selected?: boolean;
  children?: ReactNode;
  onChange?: (selected: true, event: ChangeEvent<HTMLInputElement>) => void;
}

export function Radio({
  selected,
  checked,
  onChange,
  children,
  disabled = false,
  className,
  ...rest
}: RadioProps) {
  return (
    <label
      className={classNames(
        css.ui_radio,
        { [css.ui_radio__disabled]: disabled },
        [className],
      )}
    >
      <input
        {...rest}
        type="radio"
        className={css.ui_radio__input}
        checked={selected ?? checked}
        disabled={disabled}
        onChange={(event) => {
          if (event.currentTarget.checked) onChange?.(true, event);
        }}
      />
      <span className={css.ui_radio__circle} aria-hidden="true">
        <span className={css.ui_radio__dot} />
      </span>
      {children != null && (
        <span className={css.ui_radio__label}>{children}</span>
      )}
    </label>
  );
}

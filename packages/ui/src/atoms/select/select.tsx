import { useId, type ComponentPropsWithRef, type ReactNode } from "react";

import { classNames } from "../../libs/class-names";
import { Icon } from "../icon";

import css from "./select.module.css";

export type SelectState = "default" | "error";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  ComponentPropsWithRef<"select">,
  "size"
> {
  label?: ReactNode;
  state?: SelectState;
  errorMessage?: string;
  placeholder?: string;
  options?: SelectOption[];
}

export function Select({
  label,
  state = "default",
  errorMessage,
  placeholder,
  options,
  className,
  id,
  disabled,
  required,
  value,
  defaultValue,
  children,
  "aria-describedby": ariaDescribedby,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const isError = state === "error";
  const errorId = `${selectId}-error`;
  const describedBy =
    [ariaDescribedby, isError && errorMessage ? errorId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={classNames(css.ui_select, {}, [className])}>
      {label ? (
        <label
          htmlFor={selectId}
          className={classNames(css.ui_select__label, {
            [css.ui_select__label__disabled]: disabled,
          })}
        >
          {label}
          {required ? (
            <span
              className={css.ui_select__required}
              aria-hidden
              title="Обязательное поле"
            >
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div className={css.ui_select__wrap}>
        <select
          id={selectId}
          className={classNames(
            css.ui_select__field,
            {
              [css.ui_select__field__error]: isError,
            },
            [],
          )}
          required={required}
          aria-describedby={describedBy}
          disabled={disabled}
          aria-required={required || undefined}
          aria-invalid={isError || undefined}
          value={value}
          defaultValue={
            value === undefined
              ? (defaultValue ?? (placeholder ? "" : undefined))
              : undefined
          }
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          ) : null}
          {options
            ? options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            : children}
        </select>
        <Icon
          name="chevron-down"
          size={18}
          className={css.ui_select__chevron}
        />
      </div>

      {isError && errorMessage ? (
        <span className={css.ui_select__error} id={errorId} role="alert">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

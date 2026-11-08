import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { classNames } from "../../libs/class-names";
import css from "./input.module.css";

export type InputState = "default" | "error";
export type InputVariant = "outline" | "filled" | "flushed";

const VARIANT_CLASS: Record<InputVariant, string | undefined> = {
  outline: undefined,
  filled: css.ui_input__field__filled,
  flushed: css.ui_input__field__flushed,
};

export interface InputProps extends Omit<
  ComponentPropsWithRef<"input">,
  "size"
> {
  label?: ReactNode;
  state?: InputState;
  errorMessage?: string;
  variant?: InputVariant;
  fullWidth?: boolean;
}

export function Input({
  label,
  state = "default",
  errorMessage,
  variant = "outline",
  fullWidth = false,
  className,
  id,
  disabled,
  required,
  "aria-describedby": ariaDescribedby,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isError = state === "error";
  const errorId = `${inputId}-error`;
  const describedBy =
    [ariaDescribedby, isError && errorMessage ? errorId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div
      className={classNames(css.ui_input, { [css.ui_input__full]: fullWidth }, [
        className,
      ])}
    >
      {label ? (
        <label
          htmlFor={inputId}
          className={classNames(css.ui_input__label, {
            [css.ui_input__label__disabled]: disabled,
          })}
        >
          {label}
          {required ? (
            <span
              className={css.ui_input__required}
              aria-hidden
              title="Обязательное поле"
            >
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <input
        id={inputId}
        className={classNames(
          css.ui_input__field,
          {
            [css.ui_input__field__error]: isError,
            [css.ui_input__field__full]: fullWidth,
          },
          [VARIANT_CLASS[variant]],
        )}
        required={required}
        aria-describedby={describedBy}
        disabled={disabled}
        aria-required={required || undefined}
        aria-invalid={isError || undefined}
        {...rest}
      />
      {isError && errorMessage ? (
        <span className={css.ui_input__error} id={errorId} role="alert">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

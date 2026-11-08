import { useEffect, useImperativeHandle, useRef } from "react";
import type { ChangeEvent, ComponentPropsWithRef, ReactNode } from "react";
import { classNames } from "../../libs/class-names";
import css from "./checkbox.module.css";

export type CheckboxColor = "primary" | "success";

export interface CheckboxProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type" | "onChange" | "children" | "size" | "color"
> {
  children?: ReactNode;
  color?: CheckboxColor;
  indeterminate?: boolean;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({
  checked,
  color = "primary",
  indeterminate = false,
  onChange,
  children,
  disabled = false,
  className,
  ref,
  ...rest
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!, []);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <label
      className={classNames(
        css.ui_check,
        { [css.ui_check__disabled]: disabled },
        [css[color], className],
      )}
    >
      <input
        {...rest}
        ref={inputRef}
        type="checkbox"
        className={css.ui_check__input}
        checked={checked}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : undefined}
        onChange={(event) => {
          onChange?.(event.currentTarget.checked, event);
          event.currentTarget.indeterminate = indeterminate;
        }}
      />
      <span className={css.ui_check__box} aria-hidden="true">
        <svg
          className={css.checkMark}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className={css.dashMark}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <rect x="2" y="5" width="8" height="2" rx="1" fill="currentColor" />
        </svg>
      </span>
      {children != null && (
        <span className={css.ui_check__label}>{children}</span>
      )}
    </label>
  );
}

import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "../../atoms/icon";
import { Button } from "../../atoms/button";
import css from "./copy-field.module.css";

export interface CopyFieldProps {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
}

export function CopyField({ value, label, disabled = false }: CopyFieldProps) {
  const id = useId();
  const [copied, setCopied] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    clearTimeout(timer.current);
    setPending(true);
    setError(false);
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
      setError(true);
    } finally {
      setPending(false);
    }
  }
  return (
    <div className={css.ui_copy_field}>
      {label && (
        <label htmlFor={id} className={css.ui_copy_field__label}>
          {label}
        </label>
      )}
      <div className={css.ui_copy_field__row}>
        <input
          id={id}
          className={css.ui_copy_field__input}
          value={value}
          readOnly
          disabled={disabled}
          aria-label={label ? undefined : "Значение для копирования"}
          onFocus={(event) => event.currentTarget.select()}
        />
        <Button
          isIconOnly
          variant="secondary"
          isDisabled={disabled}
          isPending={pending}
          aria-label={copied ? "Скопировано" : "Скопировать"}
          onClick={copy}
        >
          <Icon name={copied ? "check" : "copy"} size={16} />
        </Button>
      </div>
      <span className={css.feedback} role="status">
        {error ? "Не удалось скопировать" : copied ? "Скопировано" : ""}
      </span>
    </div>
  );
}

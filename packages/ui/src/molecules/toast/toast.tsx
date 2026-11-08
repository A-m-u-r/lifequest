import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { AnimationEvent, ReactNode } from "react";
import { Icon } from "../../atoms/icon";
import { classNames } from "../../libs/class-names";
import css from "./toast.module.css";

export type ToastType = "info" | "success" | "warning" | "error";

export interface ToastProps {
  type?: ToastType;
  title?: ReactNode;
  message?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  /** Milliseconds before dismissal; 0 keeps the toast visible. */
  duration?: number;
}

const ICON_BY_TYPE: Record<ToastType, string> = {
  info: "info",
  success: "sparkles",
  warning: "triangle-exclamation-point",
  error: "circle-x",
};

function BaseToast({
  type = "info",
  title,
  message,
  closable = false,
  onClose,
  className,
  duration = 4000,
}: ToastProps) {
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(true);
  const notified = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const finishClose = useCallback(() => {
    if (notified.current) return;
    notified.current = true;
    setVisible(false);
    onCloseRef.current?.();
  }, []);

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => setClosing(true), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (!closing) return;
    // Complete dismissal even when the browser does not dispatch animationend.
    const timer = setTimeout(finishClose, 220);
    return () => clearTimeout(timer);
  }, [closing, finishClose]);

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (closing && event.target === event.currentTarget) finishClose();
  };

  if (!visible) return null;

  return (
    <div
      className={classNames(css.toast, { [css.closing]: closing }, [
        css[type],
        className,
      ])}
      role={type === "error" ? "alert" : "status"}
      aria-atomic="true"
      onAnimationEnd={handleAnimationEnd}
    >
      <span className={css.icon}>
        <Icon name={ICON_BY_TYPE[type]} size={14} />
      </span>
      <div className={css.body}>
        {title && <div className={css.title}>{title}</div>}
        {message && <div className={css.message}>{message}</div>}
      </div>
      {closable && (
        <button
          type="button"
          className={css.close}
          onClick={() => setClosing(true)}
          aria-label="Закрыть уведомление"
        >
          <Icon name="x" size={14} />
        </button>
      )}
    </div>
  );
}

export const Toast = memo(BaseToast);

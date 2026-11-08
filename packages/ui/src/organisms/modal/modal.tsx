import { useEffect, useId, useRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { Icon } from "../../atoms/icon";
import { Text } from "../../atoms/text";
import { classNames } from "../../libs/class-names";
import { useOverlay } from "../../hooks/use-overlay";
import { withPortal } from "../../hocs/with-portal";
import css from "./modal.module.css";

export type ModalSize = "sm" | "default" | "wide";
export interface ModalProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title?: ReactNode;
  sub?: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  size?: ModalSize;
}

let scrollLocks = 0;
let previousOverflow = "";
const focusableSelector =
  'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

function BaseModal({
  title,
  sub,
  onClose,
  children,
  isOpen,
  size = "default",
  className,
  ...rest
}: ModalProps) {
  const { ref, isMounted, isClosing, onAnimationEnd } = useOverlay(
    isOpen,
    onClose,
    { closeOnOutside: false, closeOnEscape: false },
  );
  const id = useId();
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  useEffect(() => {
    if (!isOpen || !isMounted) return;
    const dialog = ref.current;
    if (!dialog) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    if (scrollLocks++ === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    const getFocusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter(
        (element) =>
          !element.hidden &&
          element.getClientRects().length > 0 &&
          !element.closest("[hidden], [inert]"),
      );
    const focusFirst = () => (getFocusable()[0] ?? dialog).focus();
    const isTopDialog = () => {
      const dialogs = document.querySelectorAll(
        '[role="dialog"][aria-modal="true"]',
      );
      return dialogs[dialogs.length - 1] === dialog;
    };
    const frame = requestAnimationFrame(() => {
      if (!dialog.contains(document.activeElement)) focusFirst();
    });
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !isTopDialog()) return;
      const elements = getFocusable();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first || !last) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === dialog)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const containFocus = (event: FocusEvent) => {
      if (
        isTopDialog() &&
        event.target instanceof Node &&
        !dialog.contains(event.target)
      )
        focusFirst();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented && isTopDialog()) {
        event.preventDefault();
        onCloseRef.current();
      }
    };
    window.addEventListener("keydown", escape);
    document.addEventListener("keydown", trapFocus);
    document.addEventListener("focusin", containFocus);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", escape);
      document.removeEventListener("keydown", trapFocus);
      document.removeEventListener("focusin", containFocus);
      if (--scrollLocks === 0) document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected && !dialog.contains(previousFocus))
        previousFocus.focus();
    };
  }, [isOpen, isMounted, ref]);
  if (!isMounted) return null;
  return (
    <div
      className={classNames(css.ui_overlay, {
        [css.ui_overlay__closing]: isClosing,
      })}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && isOpen) onClose();
      }}
    >
      <div
        {...rest}
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `${id}-title` : rest["aria-labelledby"]}
        aria-label={
          title || rest["aria-labelledby"]
            ? rest["aria-label"]
            : (rest["aria-label"] ?? "Модальное окно")
        }
        aria-describedby={sub ? `${id}-description` : rest["aria-describedby"]}
        tabIndex={-1}
        className={classNames(
          css.ui_modal,
          { [css.ui_modal__closing]: isClosing },
          [
            size !== "default" ? css[`ui_modal__${size}`] : undefined,
            className,
          ],
        )}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) onAnimationEnd();
        }}
      >
        <div className={css.ui_modal__head}>
          {(title || sub) && (
            <div className={css.ui_modal__title}>
              {title && <Text.H2 id={`${id}-title`}>{title}</Text.H2>}
              {sub && <Text.P2 id={`${id}-description`}>{sub}</Text.P2>}
            </div>
          )}
          <button
            type="button"
            className={css.ui_modal__close}
            onClick={onClose}
            aria-label="Закрыть"
          >
            <Icon name="x" size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Header({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={classNames(css.ui_modal__header, {}, [className])}
    >
      {children}
    </div>
  );
}
function Body({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={classNames(css.ui_modal__body, {}, [className])}>
      {children}
    </div>
  );
}
function Footer({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={classNames(css.ui_modal__foot, {}, [className])}>
      {children}
    </div>
  );
}
const PortaledModal = withPortal(BaseModal);
export const Modal = Object.assign(PortaledModal, { Header, Body, Footer });

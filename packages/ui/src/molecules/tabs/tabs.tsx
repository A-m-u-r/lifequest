import { useId, useState } from "react";
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  KeyboardEvent,
} from "react";
import { createStrictContext, useStrictContext } from "../../libs/react";
import { classNames } from "../../libs/class-names";
import css from "./tabs.module.css";

interface TabsContextValue {
  active: string;
  setActive: (value: string) => void;
  baseId: string;
  disabled: boolean;
}
const TabsContext = createStrictContext<TabsContextValue>();

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

function Root({
  defaultValue = "",
  value,
  onChange,
  disabled = false,
  children,
  ...rest
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const baseId = useId();
  const active = value ?? internal;
  function setActive(next: string) {
    if (disabled || active === next) return;
    if (value === undefined) setInternal(next);
    onChange?.(next);
  }
  return (
    <TabsContext.Provider value={{ active, setActive, baseId, disabled }}>
      <div {...rest}>{children}</div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

function List({ children, className, onKeyDown, ...rest }: TabsListProps) {
  const { disabled } = useStrictContext(TabsContext);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      disabled ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    )
      return;
    if (!(event.target instanceof HTMLElement)) return;
    const current = event.target.closest<HTMLButtonElement>('[role="tab"]');
    if (!current || current.closest('[role="tablist"]') !== event.currentTarget)
      return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)',
      ),
    ).filter((tab) => tab.closest('[role="tablist"]') === event.currentTarget);
    const index = tabs.indexOf(current);
    if (index < 0 || tabs.length === 0) return;
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % tabs.length;
        break;
      case "ArrowLeft":
        next = (index - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    tabs[next]?.focus();
    tabs[next]?.click();
  };
  return (
    <div
      {...rest}
      role="tablist"
      aria-label={
        rest["aria-label"] ?? (rest["aria-labelledby"] ? undefined : "Вкладки")
      }
      aria-orientation="horizontal"
      className={classNames(css.list, {}, [className])}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

export interface TabsTabProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "type" | "id"
> {
  value: string;
}

function Tab({
  value,
  children,
  className,
  disabled = false,
  onClick,
  ...rest
}: TabsTabProps) {
  const group = useStrictContext(TabsContext);
  const isActive = group.active === value;
  const key = encodeURIComponent(value);
  return (
    <button
      {...rest}
      id={`${group.baseId}-tab-${key}`}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`${group.baseId}-panel-${key}`}
      tabIndex={isActive ? 0 : -1}
      disabled={group.disabled || disabled}
      className={classNames(css.tab, { [css.active]: isActive }, [className])}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) group.setActive(value);
      }}
    >
      {children}
    </button>
  );
}

export interface TabsPanelProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "id"
> {
  value: string;
}

function Panel({ value, children, className, ...rest }: TabsPanelProps) {
  const group = useStrictContext(TabsContext);
  const key = encodeURIComponent(value);
  return (
    <div
      {...rest}
      id={`${group.baseId}-panel-${key}`}
      role="tabpanel"
      aria-labelledby={`${group.baseId}-tab-${key}`}
      hidden={group.active !== value}
      tabIndex={0}
      className={classNames(css.panel, {}, [className])}
    >
      {children}
    </div>
  );
}

export const Tabs = Object.assign(Root, { List, Tab, Panel });

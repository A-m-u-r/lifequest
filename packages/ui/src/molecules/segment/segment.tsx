import {
  useState,
  type Key,
  type ReactNode,
  type KeyboardEvent,
  type CSSProperties,
} from "react";
import { createStrictContext, useStrictContext } from "../../libs/react/react";
import { classNames } from "../../libs/class-names";
import css from "./segment.module.css";

export type SegmentVariant = "default" | "ghost";
export type SegmentSize = "sm" | "md" | "lg";

interface SegmentCtx {
  selected: Key | null;
  select: (key: Key) => void;
  isDisabled: boolean;
  size: SegmentSize;
  variant: SegmentVariant;
}

const SegmentContext = createStrictContext<SegmentCtx>();

function useSegmentCtx() {
  return useStrictContext(SegmentContext);
}

export interface SegmentProps {
  variant?: SegmentVariant;
  size?: SegmentSize;
  selectedKey?: Key | null;
  defaultSelectedKey?: Key;
  onSelectionChange?: (key: Key) => void;
  isDisabled?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function Root({
  variant = "default",
  size = "md",
  selectedKey,
  defaultSelectedKey,
  onSelectionChange,
  isDisabled = false,
  children,
  className,
  style,
}: SegmentProps) {
  const [internal, setInternal] = useState<Key | null>(
    defaultSelectedKey ?? null,
  );
  const selected = selectedKey !== undefined ? selectedKey : internal;

  function select(key: Key) {
    if (isDisabled || selected === key) return;
    if (selectedKey === undefined) setInternal(key);
    onSelectionChange?.(key);
  }

  return (
    <SegmentContext.Provider
      value={{ selected, select, isDisabled, size, variant }}
    >
      <div
        role="radiogroup"
        aria-label="Выбор варианта"
        aria-disabled={isDisabled || undefined}
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
          if (
            isDisabled ||
            event.defaultPrevented ||
            !(event.target instanceof HTMLButtonElement)
          )
            return;
          const items = Array.from(
            event.currentTarget.querySelectorAll<HTMLButtonElement>(
              '[role="radio"]:not(:disabled)',
            ),
          );
          const current = items.indexOf(event.target);
          if (current < 0 || !items.length) return;
          let next: number;
          switch (event.key) {
            case "ArrowRight":
            case "ArrowDown":
              next = (current + 1) % items.length;
              break;
            case "ArrowLeft":
            case "ArrowUp":
              next = (current - 1 + items.length) % items.length;
              break;
            case "Home":
              next = 0;
              break;
            case "End":
              next = items.length - 1;
              break;
            default:
              return;
          }
          event.preventDefault();
          items[next]?.focus();
          items[next]?.click();
        }}
        className={classNames(css.root, {}, [
          css[`root__${variant}`],
          className,
        ])}
        style={style}
      >
        {children}
      </div>
    </SegmentContext.Provider>
  );
}

export interface SegmentItemProps {
  id: Key;
  children:
    | ReactNode
    | ((renderProps: {
        isSelected: boolean;
        isDisabled: boolean;
      }) => ReactNode);
  isDisabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

function Item({
  id,
  children,
  isDisabled: itemDisabled,
  className,
  style,
}: SegmentItemProps) {
  const { selected, select, isDisabled: groupDisabled, size } = useSegmentCtx();
  const isSelected = selected === id;
  const isDisabled = groupDisabled || Boolean(itemDisabled);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      tabIndex={isSelected || selected === null ? 0 : -1}
      disabled={isDisabled}
      data-size={size}
      className={classNames(css.item, { [css.item__selected]: isSelected }, [
        className,
      ])}
      style={style}
      onClick={() => select(id)}
    >
      {typeof children === "function"
        ? children({ isSelected, isDisabled })
        : children}
    </button>
  );
}

export const Segment = Object.assign(Root, { Item });

import { createElement } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { classNames } from "../../libs/class-names";
import css from "./text.module.css";

export type TextAlign =
  "start" | "end" | "left" | "right" | "center" | "justify";

interface TextModifiers {
  align?: TextAlign;
  noWrap?: boolean;
  onFullWidth?: boolean;
}

type TextTag = "h1" | "h2" | "p" | "a";
type VariantProps<T extends TextTag> = ComponentPropsWithoutRef<T> &
  TextModifiers;

export type TextProps = VariantProps<"p">;
export type TextLinkProps = VariantProps<"a">;

const alignClasses: Record<TextAlign, string> = {
  start: css.start,
  end: css.end,
  left: css.left,
  right: css.right,
  center: css.center,
  justify: css.justify,
};

function createVariant<T extends TextTag>(
  Tag: T,
  variantClass: string,
  name: string,
) {
  function Component({
    align,
    noWrap,
    onFullWidth,
    className,
    children,
    ...props
  }: VariantProps<T>) {
    return createElement(
      Tag,
      {
        ...props,
        className: classNames(
          variantClass,
          {
            [css.no_wrap]: noWrap,
            [css.on_full_width]: onFullWidth,
          },
          [className, align && alignClasses[align]],
        ),
      },
      children,
    );
  }
  Component.displayName = `Text.${name}`;
  return Component;
}

export const Text = {
  Title: createVariant("h1", css.title, "Title"),
  H1: createVariant("h1", css.h1, "H1"),
  H2: createVariant("h2", css.h2, "H2"),
  P1: createVariant("p", css.p1, "P1"),
  P2: createVariant("p", css.p2, "P2"),
  P1Bold: createVariant("p", css.p1_bold, "P1Bold"),
  P1Link: createVariant("a", css.p1_link, "P1Link"),
  P2Link: createVariant("a", css.p2_link, "P2Link"),
};

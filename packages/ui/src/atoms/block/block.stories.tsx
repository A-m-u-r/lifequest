import type { Meta, StoryObj } from "@storybook/react-vite";
import { Block } from "./block";
import { Chip } from "../chip";
import { Icon } from "../icon";
import { Text } from "../text";

const meta = {
  title: "Atoms/Block",
  component: Block,
  parameters: { layout: "padded" },
  args: {
    children: "Любое содержимое блока",
    variant: "default",
    padding: "md",
    radius: "lg",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "muted",
        "primary",
        "success",
        "warning",
        "info",
        "coupon",
      ],
    },
    padding: { control: "inline-radio", options: ["none", "sm", "md", "lg"] },
    radius: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl", "pill"],
    },
  },
} satisfies Meta<typeof Block>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--sp-3)", maxWidth: 360 }}>
      {(
        [
          "default",
          "muted",
          "primary",
          "success",
          "warning",
          "info",
          "coupon",
        ] as const
      ).map((variant) => (
        <Block key={variant} variant={variant}>
          {variant}
        </Block>
      ))}
    </div>
  ),
};
export const RewardCoupon: Story = {
  render: () => (
    <Block
      variant="coupon"
      radius="xl"
      style={{
        maxWidth: 360,
        textAlign: "center",
        display: "grid",
        gap: "var(--sp-2)",
      }}
    >
      <Chip kind="status" tone="primary" variant="outline">
        ЛИЧНЫЙ КУПОН ВОЗНАГРАЖДЕНИЯ
      </Chip>
      <strong>
        <Icon name="lq-clapperboard" size={16} /> Вечер кино + попкорн
      </strong>
      <small style={{ color: "var(--text-secondary)" }}>
        Оплачено трудом и дисциплиной · 250 <Icon name="lq-coin" size={14} />
      </small>
    </Block>
  ),
};
export const ReferenceGallery: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "var(--sp-3)",
        maxWidth: 360,
        fontSize: "var(--text-sm)",
      }}
    >
      <Block radius="xl">
        <Text.P1Bold>Новая личная награда</Text.P1Bold>
        <Text.P2>Сюда можно вложить форму, поля ввода и переключатели.</Text.P2>
      </Block>
      <Block
        variant="primary"
        style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)" }}
      >
        <span aria-hidden="true" style={{ fontSize: "var(--text-2xl)" }}>
          <Icon name="lq-clapperboard" size={16} />
        </span>
        <span>
          <strong>Вечер кино</strong>
          <Text.P2>Главная цель недели · осталось 30 монет</Text.P2>
        </span>
        <Chip kind="status" tone="primary">
          220 / 250 <Icon name="lq-coin" size={14} />
        </Chip>
      </Block>
      <Block>
        <Text.P1Bold>Открытые достижения (8 / 20)</Text.P1Bold>
        <div
          style={{
            display: "flex",
            gap: "var(--sp-2)",
            marginTop: "var(--sp-2)",
          }}
        >
          {["book-open", "lq-flame", "lq-clapperboard", "zap"].map((icon) => (
            <Block key={icon} variant="muted" padding="sm" radius="md">
              <Icon name={icon} size={24} />
            </Block>
          ))}
        </div>
      </Block>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "var(--sp-2)",
        }}
      >
        {[
          ["24", "Квеста сдано", "var(--color-success)"],
          ["86%", "Регулярность", "var(--color-primary)"],
          ["+840", "Опыта за неделю", "var(--color-warning)"],
        ].map(([value, label, color]) => (
          <Block key={label} padding="sm" style={{ textAlign: "center" }}>
            <strong style={{ color, fontSize: "var(--text-lg)" }}>
              {value}
            </strong>
            <Text.P2>{label}</Text.P2>
          </Block>
        ))}
      </div>
      <Block
        variant="warning"
        style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)" }}
      >
        <span aria-hidden="true">
          <Icon name="trophy" size={16} />
        </span>
        <strong style={{ color: "var(--color-warning-text)" }}>
          Гранд-награда за цель
          <br />
          +150 <Icon name="lq-coin" size={16} /> и образ «Магистр»
        </strong>
      </Block>
      <Block variant="success" padding="sm">
        <Icon name="circle-check" size={16} color="var(--color-success)" /> 1.
        Написать Vision и анализ…{" "}
        <Chip kind="status" tone="success">
          +50 XP
        </Chip>
      </Block>
      <Block variant="info" radius="xl" style={{ textAlign: "center" }}>
        <Chip kind="status" tone="info" variant="outline">
          <Icon name="lq-snowflake" size={14} />
          Никаких штрафов и потери уровня!
        </Chip>
        <Text.P1Bold>
          Пропустил вчерашний день?
          <br />
          Всё в порядке!
        </Text.P1Bold>
        <Text.P2>
          Сделай сегодня один маленький шаг на 5 минут, чтобы мягко вернуться в
          ритм.
        </Text.P2>
      </Block>
      <Block variant="success" style={{ textAlign: "center" }}>
        <strong style={{ color: "var(--color-success-text)" }}>
          <Icon name="bell" size={16} /> Честный пробный период 7 дней — 0 ₽
        </strong>
        <Text.P2>
          Пришлём push-уведомление за 2 дня до окончания триала. Отмена в один
          клик.
        </Text.P2>
      </Block>
      <Block
        variant="muted"
        padding="sm"
        style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)" }}
      >
        <span aria-hidden="true">
          <Icon name="cat" size={16} />
        </span>
        <span>
          <strong>Елена (Ты) · Ур. 7</strong>
          <Text.P2>Сдала 2 квеста сегодня</Text.P2>
        </span>
        <Chip kind="status" tone="warning">
          5 дн. <Icon name="lq-flame" size={14} />
        </Chip>
      </Block>
    </div>
  ),
};

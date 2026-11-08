import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioCards } from "./radio-cards";
import { Icon } from "../icon";
import { fn } from "storybook/test";

const meta = {
  title: "Atoms/RadioCards",
  component: RadioCards,
  args: { value: "noir", onChange: fn() },
  parameters: { layout: "padded" },
} satisfies Meta<typeof RadioCards>;
export default meta;
type Story = StoryObj<typeof meta>;

function ControlledDemo({ disabled = false }: { disabled?: boolean }) {
  const [value, setValue] = useState("noir");
  return (
    <form
      aria-label="Выбор спутника"
      onReset={() => setValue("noir")}
      style={{ display: "grid", gap: "var(--sp-4)" }}
    >
      <RadioCards
        name="companion"
        value={value}
        onChange={setValue}
        variant="chip"
        withCheck
        disabled={disabled}
        aria-label="Спутник"
      >
        <RadioCards.Card value="noir">
          <span aria-hidden="true">
            <Icon name="cat" size={18} />
          </span>
          Нуар
        </RadioCards.Card>
        <RadioCards.Card value="owl">
          <span aria-hidden="true">
            <Icon name="bird" size={18} />
          </span>
          Сова
        </RadioCards.Card>
        <RadioCards.Card value="zephyr">
          <span aria-hidden="true">
            <Icon name="wind" size={18} />
          </span>
          Зефир
        </RadioCards.Card>
        <RadioCards.Card value="unavailable" disabled>
          Недоступен
        </RadioCards.Card>
      </RadioCards>
      <output>{value}</output>
      <button type="reset">Сбросить</button>
    </form>
  );
}

export const Controlled: Story = { render: () => <ControlledDemo /> };
export const Disabled: Story = { render: () => <ControlledDemo disabled /> };

function CardsDemo() {
  const [value, setValue] = useState("noir");
  return (
    <RadioCards
      value={value}
      onChange={setValue}
      aria-label="Выберите спутника"
    >
      {[
        ["noir", "cat", "Нуар", "Мудрый помощник", "Интеллект"],
        ["owl", "bird", "Сова", "Планировщик", "Дисциплина"],
        ["zephyr", "wind", "Зефир", "Мотиватор", "Энергия"],
      ].map(([value, icon, label, description, stat]) => (
        <RadioCards.Card key={value} value={value}>
          <span aria-hidden="true" style={{ fontSize: "var(--sp-7)" }}>
            <Icon name={icon} style={{ width: "1em", height: "1em" }} />
          </span>
          <span>
            <InlineText>{label}</InlineText>
          </span>
          <small style={{ color: "var(--text-tertiary)" }}>{description}</small>
          <small>
            <InlineText>{stat}</InlineText>
          </small>
        </RadioCards.Card>
      ))}
    </RadioCards>
  );
}
export const Cards: Story = { render: () => <CardsDemo /> };

function CustomBadgeDemo() {
  const [value, setValue] = useState("year");
  return (
    <RadioCards
      value={value}
      onChange={setValue}
      variant="card"
      aria-label="Тариф"
      renderBadge={({ checked }) =>
        checked && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--sp-1)",
              padding: "var(--sp-1) var(--sp-2)",
              borderRadius: "var(--radius-pill)",
              background: "var(--color-success)",
              color: "var(--text-inverse)",
              fontSize: "var(--text-xs)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Icon name="check" size={12} /> Выбрано
          </span>
        )
      }
    >
      <RadioCards.Card value="month">1 месяц</RadioCards.Card>
      <RadioCards.Card value="year">12 месяцев</RadioCards.Card>
    </RadioCards>
  );
}
export const CustomBadge: Story = { render: () => <CustomBadgeDemo /> };

function VariantsDemo() {
  const [value, setValue] = useState("first");
  return (
    <div style={{ display: "grid", gap: "var(--sp-5)" }}>
      {(["card", "chip", "tab"] as const).map((variant) => (
        <RadioCards
          key={variant}
          value={value}
          onChange={setValue}
          variant={variant}
          aria-label={variant}
        >
          <RadioCards.Card value="first">Первый</RadioCards.Card>
          <RadioCards.Card value="second">Второй</RadioCards.Card>
        </RadioCards>
      ))}
    </div>
  );
}
export const Variants: Story = { render: () => <VariantsDemo /> };

function BadgeNodeDemo() {
  const [value, setValue] = useState("first");
  return (
    <RadioCards
      value={value}
      onChange={setValue}
      variant="chip"
      aria-label="Значок"
      renderBadge={<Icon name="lq-coin" size={20} />}
    >
      <RadioCards.Card value="first">Первый</RadioCards.Card>
      <RadioCards.Card value="second">Второй</RadioCards.Card>
    </RadioCards>
  );
}
export const BadgeNode: Story = { render: () => <BadgeNodeDemo /> };

const TEXT_ICONS: Record<string, string> = {
  Интеллект: "brain",
  Дисциплина: "shield",
  Энергия: "zap",
  Смелость: "mountain",
  Гармония: "leaf",
  Адаптивность: "lq-snowflake",
  "Учёба и ВУЗ": "graduation-cap",
  Здоровье: "activity",
  Работа: "briefcase",
  Финансы: "lq-coin",
  "Отдых и сон": "moon",
  "Дом и уют": "house",
};
function InlineText({ children }: { children: string }) {
  const icon = TEXT_ICONS[children];
  if (children.endsWith(" монет"))
    return (
      <>
        {children.replace(" монет", "")} <Icon name="lq-coin" size={12} />
      </>
    );
  return (
    <>
      {icon && <Icon name={icon} size={12} />} {children}
    </>
  );
}

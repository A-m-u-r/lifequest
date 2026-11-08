import { useId, useState } from "react";
import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Icon } from "../icon";
import { RadioCard } from "./radio-card";

const meta = {
  title: "Atoms/RadioCard",
  component: RadioCard,
  args: { children: "Нуар", value: "noir", onChange: fn() },
  argTypes: {
    variant: { control: "inline-radio", options: ["card", "chip", "tab"] },
    color: { control: "inline-radio", options: ["primary", "warning"] },
    layout: { control: "inline-radio", options: ["vertical", "horizontal"] },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    withCheck: { control: "boolean" },
  },
} satisfies Meta<typeof RadioCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Selected: Story = {
  args: { defaultChecked: true, withCheck: true },
};
export const Disabled: Story = { args: { disabled: true } };
export const SelectedDisabled: Story = {
  args: { defaultChecked: true, disabled: true },
};

function Group({
  title,
  columns = "repeat(2, minmax(0, 1fr))",
  children,
}: {
  title: string;
  columns?: string;
  children: (name: string) => ReactNode;
}) {
  const name = useId();
  return (
    <fieldset
      style={{
        width: 320,
        maxWidth: "100%",
        boxSizing: "border-box",
        border: 0,
        padding: "var(--sp-2)",
        margin: 0,
      }}
    >
      <legend
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--weight-semibold)",
          color: "var(--text-primary)",
          marginBottom: "var(--sp-3)",
        }}
      >
        {title}
      </legend>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: columns,
          gap: "var(--sp-2)",
        }}
      >
        {children(name)}
      </div>
    </fieldset>
  );
}

function PricingDemo() {
  return (
    <Group title="Подписка">
      {(name) => (
        <>
          <RadioCard name={name} value="month">
            <span>1 месяц</span>
            <strong style={{ fontSize: "var(--text-lg)" }}>399 ₽</strong>
            <small style={{ color: "var(--text-tertiary)" }}>
              гибкий старт
            </small>
          </RadioCard>
          <RadioCard name={name} value="year" defaultChecked badge="Выгода 40%">
            <span>12 месяцев</span>
            <strong style={{ fontSize: "var(--text-lg)" }}>2 490 ₽</strong>
            <small style={{ color: "var(--color-primary)" }}>207 ₽ / мес</small>
          </RadioCard>
        </>
      )}
    </Group>
  );
}
export const Pricing: Story = { render: () => <PricingDemo /> };
function AmountDemo() {
  return (
    <Group title="Стоимость в монетах" columns="repeat(3, minmax(0, 1fr))">
      {(name) =>
        [100, 250, 500].map((amount) => (
          <RadioCard
            key={amount}
            name={name}
            value={String(amount)}
            defaultChecked={amount === 250}
            variant="chip"
            color="warning"
            aria-label={`${amount} монет`}
          >
            {amount}
            <Icon name="lq-coin" size={14} />
          </RadioCard>
        ))
      }
    </Group>
  );
}
export const Amounts: Story = { render: () => <AmountDemo /> };
function EquipmentDemo() {
  return (
    <Group title="Гардероб">
      {(name) =>
        [
          ["headphones", "Наушники Фокус", "Надето"],
          ["glasses", "Очки Совы", "В гардеробе"],
          ["ribbon", "Тёплый шарф", "В гардеробе"],
          ["hat-glasses", "Шляпа следопыта", "120 монет"],
          ["crown", "Золотая корона", "250 монет"],
          ["backpack", "Походный рюкзак", "90 монет"],
        ].map(([icon, label, caption], index) => (
          <RadioCard
            key={label}
            name={name}
            value={String(index)}
            defaultChecked={index === 0}
            layout="horizontal"
          >
            <span aria-hidden="true" style={{ fontSize: "var(--text-2xl)" }}>
              <Icon name={icon} style={{ width: "1em", height: "1em" }} />
            </span>
            <span style={{ display: "grid", gap: "var(--sp-1)" }}>
              <span>
                <InlineText>{label}</InlineText>
              </span>
              <small style={{ color: "var(--color-primary)" }}>
                <InlineText>{caption}</InlineText>
              </small>
            </span>
          </RadioCard>
        ))
      }
    </Group>
  );
}
export const Equipment: Story = { render: () => <EquipmentDemo /> };
function TabsDemo() {
  return (
    <Group title="Категория гардероба" columns="repeat(3, auto)">
      {(name) =>
        ["Голова и очки", "Одежда", "Фон комнаты"].map((label, index) => (
          <RadioCard
            key={label}
            name={name}
            value={String(index)}
            variant="tab"
            defaultChecked={index === 0}
          >
            <InlineText>{label}</InlineText>
          </RadioCard>
        ))
      }
    </Group>
  );
}
export const Tabs: Story = { render: () => <TabsDemo /> };
function CompanionsDemo({
  compact = false,
  withCheck = false,
}: {
  compact?: boolean;
  withCheck?: boolean;
}) {
  return (
    <Group
      title="Выбор спутника"
      columns={compact ? "repeat(3, auto)" : undefined}
    >
      {(name) =>
        [
          ["cat", "Нуар", "Мудрый помощник", "Интеллект"],
          ["bird", "Сова", "Планировщик", "Дисциплина"],
          ["wind", "Зефир", "Мотиватор", "Энергия"],
          ...(compact
            ? []
            : [
                ["compass", "Рико", "Исследователь", "Смелость"],
                ["leaf", "Тибо", "Хранитель баланса", "Гармония"],
                ["bot", "Пикс", "Универсал", "Адаптивность"],
              ]),
        ].map(([icon, label, description, stat], index) => (
          <RadioCard
            key={label}
            name={name}
            value={String(index)}
            defaultChecked={index === 0}
            variant={compact ? "chip" : "card"}
            withCheck={withCheck}
          >
            <span
              aria-hidden="true"
              style={{ fontSize: compact ? "var(--text-lg)" : "var(--sp-7)" }}
            >
              <Icon name={icon} style={{ width: "1em", height: "1em" }} />
            </span>
            <span>
              <InlineText>{label}</InlineText>
            </span>
            {!compact && (
              <>
                <small style={{ color: "var(--text-tertiary)" }}>
                  {description}
                </small>
                <small>
                  <InlineText>{stat}</InlineText>
                </small>
              </>
            )}
          </RadioCard>
        ))
      }
    </Group>
  );
}
export const Companions: Story = { render: () => <CompanionsDemo /> };
export const Chips: Story = { render: () => <CompanionsDemo compact /> };
export const WithCheck: Story = {
  render: () => <CompanionsDemo compact withCheck />,
};
function InterestsDemo() {
  return (
    <Group title="Сфера развития">
      {(name) =>
        [
          "Учёба и ВУЗ",
          "Здоровье",
          "Работа",
          "Финансы",
          "Отдых и сон",
          "Дом и уют",
        ].map((label, index) => (
          <RadioCard
            key={label}
            name={name}
            value={String(index)}
            variant="chip"
            defaultChecked={index === 0}
          >
            <InlineText>{label}</InlineText>
          </RadioCard>
        ))
      }
    </Group>
  );
}
export const Interests: Story = { render: () => <InterestsDemo /> };
function ControlledDemo() {
  const [value, setValue] = useState("noir");
  const name = useId();
  return (
    <form
      aria-label="Выбор спутника"
      style={{ display: "grid", gap: "var(--sp-3)" }}
    >
      <div style={{ display: "flex", gap: "var(--sp-2)" }}>
        <RadioCard
          name={name}
          value="noir"
          checked={value === "noir"}
          onChange={(e) => setValue(e.currentTarget.value)}
        >
          Нуар
        </RadioCard>
        <RadioCard
          name={name}
          value="owl"
          checked={value === "owl"}
          onChange={(e) => setValue(e.currentTarget.value)}
        >
          Сова
        </RadioCard>
        <RadioCard name={name} value="disabled" disabled>
          Недоступен
        </RadioCard>
      </div>
      <output>{value}</output>
      <button type="reset" onClick={() => setValue("noir")}>
        Сбросить
      </button>
    </form>
  );
}
export const Controlled: Story = { render: () => <ControlledDemo /> };

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

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "./chip";
import { Icon } from "../icon";

const meta = {
  title: "Atoms/Chip",
  component: Chip,
  args: { kind: "status", tone: "neutral", children: "Уровень 7" },
  argTypes: {
    kind: { control: "inline-radio", options: ["filter", "status"] },
    tone: {
      control: "select",
      options: ["primary", "success", "warning", "error", "info", "neutral"],
    },
    variant: { control: "inline-radio", options: ["soft", "outline", "solid"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
    status: {
      control: "select",
      options: ["completed", "in-progress", "not-started", "locked"],
    },
  },
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Success: Story = { args: { tone: "success", children: "80%" } };
export const Warning: Story = {
  args: { tone: "warning", children: "QUEST COMPLETE!" },
};
export const Outline: Story = {
  args: { variant: "outline", children: "Экран 2: Сегодня · Герой Сова" },
};
export const Solid: Story = {
  args: { tone: "success", variant: "solid", children: "Выгода 40%" },
};
export const Disabled: Story = {
  args: { kind: "filter", disabled: true, children: "Недоступно" },
};

function FiltersDemo() {
  const [active, setActive] = useState("Все");
  return (
    <div
      role="group"
      aria-label="Фильтры квестов"
      style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)" }}
    >
      {["Все", "В процессе", "Готово"].map((label) => (
        <Chip
          key={label}
          kind="filter"
          variant="outline"
          selected={active === label}
          onClick={() => setActive(label)}
        >
          {label}
        </Chip>
      ))}
    </div>
  );
}
export const FilterGroup: Story = { render: () => <FiltersDemo /> };
export const Statuses: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)" }}>
      <Chip kind="status" status="completed">
        Завершён
      </Chip>
      <Chip kind="status" status="in-progress">
        В процессе
      </Chip>
      <Chip kind="status" status="not-started">
        Не начат
      </Chip>
      <Chip kind="status" status="locked">
        Закрыт
      </Chip>
    </div>
  ),
};
export const ReferenceGallery: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "var(--sp-3)",
        padding: "var(--sp-4)",
        background: "var(--surface-subtle)",
      }}
    >
      <Chip kind="status">Уровень 7</Chip>
      <Chip kind="status" tone="success">
        80%
      </Chip>
      <Chip kind="status" tone="neutral" variant="outline">
        <span
          aria-hidden="true"
          style={{
            width: "var(--sp-2)",
            height: "var(--sp-2)",
            borderRadius: "var(--radius-circle)",
            background: "var(--color-primary)",
          }}
        />
        Экран 2: Сегодня · Герой Сова
      </Chip>
      <Chip kind="status" tone="primary">
        88%
      </Chip>
      <Chip kind="status" tone="success">
        <Icon name="lq-sparkle" size={12} color="currentColor" />
        RPG-трекер жизни
      </Chip>
      <Chip kind="status" tone="neutral" variant="outline">
        <Icon name="lq-coin" size={20} />
        180
      </Chip>
      <Chip kind="status" tone="success">
        <Icon name="timer" size={16} /> Фокус-сессия активна
      </Chip>
      <Chip kind="status" tone="warning">
        <Icon name="lq-sparkle" size={12} color="currentColor" />
        QUEST COMPLETE!
      </Chip>
      <Chip kind="status" tone="primary">
        <Icon name="graduation-cap" size={16} /> СФЕРА: УЧЁБА · БОСС-КВЕСТ
      </Chip>
      <Chip kind="status" tone="info" variant="outline">
        <Icon name="lq-snowflake" size={14} />
        Никаких штрафов и потери уровня!
      </Chip>
      <Chip kind="status" tone="primary">
        Баланс
      </Chip>
      <Chip kind="status" tone="warning">
        <Icon name="lq-flame" size={14} />
        <span>
          5<br />
          дн.
        </span>
      </Chip>
      <Chip kind="status" tone="primary">
        Образ: Лоу-фай студент
      </Chip>
      <Chip kind="status" tone="primary">
        09:00
      </Chip>
      <Chip kind="status" tone="primary">
        21:00
      </Chip>
      <Chip kind="status" tone="warning">
        5 дн. <Icon name="lq-flame" size={14} />
      </Chip>
    </div>
  ),
};

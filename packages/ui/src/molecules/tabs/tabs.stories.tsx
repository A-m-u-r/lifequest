import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./tabs";
import { Icon } from "../../atoms/icon";

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
  args: { defaultValue: "today" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { value: "today", icon: "calendar", label: "Сегодня" },
  { value: "goals", icon: "target", label: "Цели" },
  { value: "hero", icon: "cat", label: "Герой" },
  { value: "rewards", icon: "gift", label: "Награды" },
];
function Demo({
  controlled = false,
  disabled = false,
  disabledItem = false,
}: {
  controlled?: boolean;
  disabled?: boolean;
  disabledItem?: boolean;
}) {
  const [value, setValue] = useState("today");
  return (
    <Tabs
      defaultValue="today"
      value={controlled ? value : undefined}
      onChange={controlled ? setValue : undefined}
      disabled={disabled}
      style={{ width: 340, maxWidth: "100%" }}
    >
      <Tabs.List aria-label="Разделы LifeQuest">
        {items.map((item) => (
          <Tabs.Tab
            key={item.value}
            value={item.value}
            disabled={disabledItem && item.value === "hero"}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {items.map((item) => (
        <Tabs.Panel key={item.value} value={item.value}>
          <p>{item.label}: содержимое раздела</p>
          {item.value === "today" && (
            <input aria-label="Название квеста" placeholder="Новый квест" />
          )}
        </Tabs.Panel>
      ))}
      {controlled && <output>{value}</output>}
    </Tabs>
  );
}
export const Default: Story = { render: () => <Demo /> };
export const Controlled: Story = { render: () => <Demo controlled /> };
export const Disabled: Story = { render: () => <Demo disabled /> };
export const DisabledItem: Story = { render: () => <Demo disabledItem /> };
export const TwoInstances: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--sp-5)" }}>
      <Demo />
      <Demo />
    </div>
  ),
};

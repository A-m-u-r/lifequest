import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./toggle";
import type { ToggleSize, ToggleVariant } from "./toggle";
import { Icon } from "../icon";

const meta = {
  title: "Atoms/Toggle",
  component: Toggle,
  args: { defaultValue: "today" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Toggle>;
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
  readOnly = false,
  disabledItem = false,
  variant = "soft",
  size = "md",
}: {
  controlled?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  disabledItem?: boolean;
  variant?: ToggleVariant;
  size?: ToggleSize;
}) {
  const [value, setValue] = useState("today");
  return (
    <div
      style={{
        width: 340,
        maxWidth: "100%",
        display: "grid",
        gap: "var(--sp-3)",
      }}
    >
      <Toggle
        aria-label="Раздел"
        defaultValue="today"
        value={controlled ? value : undefined}
        onChange={setValue}
        disabled={disabled}
        readOnly={readOnly}
        variant={variant}
        size={size}
        fullWidth
      >
        {items.map((item) => (
          <Toggle.Item
            key={item.value}
            value={item.value}
            disabled={disabledItem && item.value === "hero"}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </Toggle.Item>
        ))}
      </Toggle>
      <output>{value}</output>
    </div>
  );
}
export const Default: Story = { render: () => <Demo /> };
export const Controlled: Story = { render: () => <Demo controlled /> };
export const Disabled: Story = { render: () => <Demo disabled /> };
export const DisabledItem: Story = { render: () => <Demo disabledItem /> };
export const ReadOnly: Story = { render: () => <Demo readOnly /> };
export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--sp-4)" }}>
      {(["soft", "outline", "solid"] as const).map((variant) => (
        <Demo key={variant} variant={variant} />
      ))}
    </div>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--sp-4)" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Demo key={size} size={size} />
      ))}
    </div>
  ),
};
export const WithoutSelection: Story = {
  render: () => (
    <Toggle aria-label="Без выбора">
      <Toggle.Item value="one">Первый</Toggle.Item>
      <Toggle.Item value="two">Второй</Toggle.Item>
    </Toggle>
  ),
};

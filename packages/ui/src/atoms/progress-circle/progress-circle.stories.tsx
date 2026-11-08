import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressCircle } from "./progress-circle";
import { Icon } from "../icon";
import { Button } from "../button";

const meta = {
  title: "Atoms/ProgressCircle",
  component: ProgressCircle,
  args: { value: 75, variant: "success", size: 180, strokeWidth: 10 },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    variant: {
      control: "select",
      options: ["primary", "success", "warning", "error", "info"],
    },
    size: { control: { type: "range", min: 48, max: 320, step: 4 } },
    strokeWidth: { control: { type: "range", min: 1, max: 24 } },
  },
} satisfies Meta<typeof ProgressCircle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Reference: Story = {
  render: (args) => (
    <ProgressCircle {...args} aria-label="Прогресс квеста">
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: "var(--sp-8)",
          height: "var(--sp-8)",
          borderRadius: "var(--radius-circle)",
          background: "var(--color-success-bg)",
        }}
      >
        <Icon name="cat" size={48} color="var(--color-gray-900)" />
      </span>
    </ProgressCircle>
  ),
};
export const WithText: Story = {
  render: (args) => (
    <ProgressCircle {...args}>
      <span>
        <strong style={{ fontSize: "var(--text-2xl)" }}>{args.value}%</strong>
        <br />
        <span
          style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}
        >
          Выполнено
        </span>
      </span>
    </ProgressCircle>
  ),
};
export const WithAction: Story = {
  render: (args) => (
    <ProgressCircle {...args}>
      <Button size="sm">Продолжить</Button>
    </ProgressCircle>
  ),
};
export const Empty: Story = { args: { value: 0 } };
export const Complete: Story = { args: { value: 100 } };
export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-5)" }}>
      {(["primary", "success", "warning", "error", "info"] as const).map(
        (variant) => (
          <ProgressCircle
            {...args}
            key={variant}
            variant={variant}
            size={120}
            aria-label={variant}
          >
            <Icon
              name={variant === "success" ? "check" : "lq-sparkle"}
              size={24}
              color={`var(--color-${variant})`}
            />
          </ProgressCircle>
        ),
      )}
    </div>
  ),
};
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-5)" }}>
      {[64, 120, 180].map((size) => (
        <ProgressCircle
          {...args}
          key={size}
          size={size}
          strokeWidth={size / 18}
        >
          <Icon name="lq-coin" size={size / 4} />
        </ProgressCircle>
      ))}
    </div>
  ),
};
export const Interactive: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(75);
    return (
      <div
        style={{ display: "grid", gap: "var(--sp-4)", justifyItems: "center" }}
      >
        <ProgressCircle {...args} value={value} aria-label="Прогресс квеста">
          <strong style={{ fontSize: "var(--text-2xl)" }}>{value}%</strong>
        </ProgressCircle>
        <label style={{ fontFamily: "var(--font-body)" }}>
          Значение прогресса{" "}
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(event) => setValue(Number(event.currentTarget.value))}
          />
        </label>
      </div>
    );
  },
};
export const Boundaries: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--sp-4)" }}>
      {[-50, 150, NaN].map((value, index) => (
        <ProgressCircle {...args} key={index} value={value} size={96} />
      ))}
    </div>
  ),
};

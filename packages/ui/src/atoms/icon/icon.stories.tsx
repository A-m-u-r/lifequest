import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./icon";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  args: { name: "sparkles", size: 32, color: "var(--color-primary)" },
  argTypes: {
    name: { control: "text" },
    size: { control: { type: "range", min: 12, max: 64, step: 2 } },
    color: { control: "color" },
    strokeWidth: { control: { type: "range", min: 1, max: 3, step: 0.5 } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gallery: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, maxWidth: 440 }}>
      {[
        "check",
        "x",
        "sparkles",
        "refresh-cw",
        "inbox",
        "triangle-exclamation-point",
        "circle-check",
        "trophy",
        "flame",
        "book-open",
        "snowflake",
        "gift",
        "lq-coin",
        "lq-clapperboard",
        "lq-sparkle",
        "lq-underline",
        "lq-flame",
        "lq-snowflake",
      ].map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            width: 88,
          }}
        >
          <Icon
            {...args}
            name={name}
            size={name === "lq-underline" ? 72 : 24}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Accessible: Story = {
  args: {
    name: "circle-check",
    role: "img",
    "aria-hidden": false,
    "aria-label": "Готово",
  },
};

export const UnknownName: Story = { args: { name: "not-an-icon" } };

export const CustomCoin: Story = { args: { name: "lq-coin", size: 20 } };

export const CustomSparkle: Story = {
  args: { name: "lq-sparkle", size: 20, color: "#2D68FF" },
};
export const CustomUnderline: Story = {
  args: { name: "lq-underline", size: 96 },
};
export const CustomFlame: Story = {
  args: { name: "lq-flame", size: 16, color: "var(--color-reward)" },
};
export const CustomSnowflake: Story = {
  args: { name: "lq-snowflake", size: 20, color: "var(--color-freeze)" },
};

export const CustomClapperboard: Story = {
  args: { name: "lq-clapperboard", size: 44 },
};

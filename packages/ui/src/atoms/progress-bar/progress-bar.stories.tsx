import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../icon";
import { ProgressBar } from "./progress-bar";
import type { ProgressBarColor } from "./progress-bar";

const meta = {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
  args: { value: 75, color: "primary", "aria-label": "Прогресс цели" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    color: {
      control: "select",
      options: ["primary", "success", "warning", "error", "info"],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { value: 60, color: "success" } };
export const Warning: Story = { args: { value: 45, color: "warning" } };
export const ErrorBar: Story = { args: { value: 25, color: "error" } };
export const Info: Story = { args: { value: 80, color: "info" } };
export const Empty: Story = { args: { value: 0 } };
export const Complete: Story = { args: { value: 100, color: "success" } };

const goals: {
  title: string;
  icon: string;
  caption: string;
  value: number;
  color: ProgressBarColor;
}[] = [
  {
    icon: "graduation-cap",
    title: "Учёба и диплом",
    caption: "3 из 4 задач на неделе",
    value: 75,
    color: "primary",
  },
  {
    icon: "activity",
    title: "Здоровье и прогулки",
    caption: "4 из 7 тренировок",
    value: 60,
    color: "success",
  },
  {
    icon: "lq-coin",
    title: "Финансы и учёт",
    caption: "Копилка отложена",
    value: 45,
    color: "warning",
  },
];

export const Reference: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "var(--sp-2)",
        fontFamily: "var(--font-body)",
      }}
    >
      {goals.map(({ title, caption, value, color, icon }) => (
        <div
          key={title}
          style={{
            display: "grid",
            gap: "var(--sp-2)",
            padding: "var(--sp-3)",
            borderRadius: "var(--radius-lg)",
            background: "var(--surface-subtle)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "var(--sp-2)",
              color: "var(--text-primary)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-bold)",
            }}
          >
            <span>
              <Icon name={icon} size={14} /> {title}
            </span>
            <span>{value}%</span>
          </div>
          <span
            style={{
              color: "var(--text-tertiary)",
              fontSize: "var(--text-xs)",
            }}
          >
            {caption}
          </span>
          <ProgressBar value={value} color={color} aria-label={title} />
        </div>
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  args: { width: 300, height: 40, border: "var(--radius-lg)" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Circle: Story = { args: { width: 64, height: 64, border: "50%" } };
export const Card: Story = {
  render: () => (
    <div style={{ width: 300, display: "grid", gap: "var(--sp-3)" }}>
      <Skeleton width="100%" height={140} />
      <Skeleton width="75%" height={20} />
      <Skeleton width="100%" height={14} />
      <Skeleton width="60%" height={14} />
    </div>
  ),
};

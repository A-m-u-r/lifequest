import { Avatar } from "./avatar";
import type { Meta, StoryObj } from "@storybook/react-vite";

const person = {
  name: "Михаил Орлов",
  initials: "МО",
  color: "var(--color-primary)",
};

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { person, size: 48 },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRing: Story = { args: { ring: true } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {[24, 36, 48, 64].map((size) => (
        <Avatar key={size} person={person} size={size} />
      ))}
    </div>
  ),
};

export const Group: Story = {
  render: () => {
    const people = [
      { name: "Елена Кузнецова", initials: "ЕК", color: "var(--color-accent)" },
      { name: "Никита Волков", initials: "НВ", color: "var(--color-success)" },
      { name: "Анна Морозова", initials: "АМ", color: "var(--color-warning)" },
    ];
    return (
      <div style={{ display: "flex", gap: 12 }}>
        {people.map((p) => (
          <Avatar key={p.initials} person={p} />
        ))}
      </div>
    );
  },
};

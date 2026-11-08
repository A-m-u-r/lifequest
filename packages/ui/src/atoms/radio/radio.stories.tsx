import { Radio } from "./radio";
import { fn } from "storybook/test";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Atoms/Radio",
  component: Radio,
  args: { onChange: fn() },
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = { args: { children: "Beginner" } };

export const Selected: Story = {
  args: { children: "Beginner", selected: true },
};

export const Disabled: Story = {
  args: { children: "Locked tier", disabled: true },
};

export const Group: Story = {
  render: function Render() {
    const options = ["Beginner", "Intermediate", "Advanced"];
    const [value, setValue] = useState("Beginner");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {options.map((option) => (
          <Radio
            key={option}
            name="level"
            value={option}
            selected={value === option}
            onChange={() => setValue(option)}
          >
            {option}
          </Radio>
        ))}
      </div>
    );
  },
};

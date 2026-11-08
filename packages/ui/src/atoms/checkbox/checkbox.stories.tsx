import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Block } from "../block";
import { Chip } from "../chip";
import { Checkbox } from "./checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = { args: { children: "Remember me" } };

export const Checked: Story = {
  args: { children: "Remember me", checked: true },
};

export const Indeterminate: Story = {
  args: { children: "Select all", indeterminate: true },
};

export const Disabled: Story = {
  args: { children: "Unavailable option", disabled: true },
};

export const DisabledChecked: Story = {
  args: { children: "Locked in", checked: true, disabled: true },
};

export const Uncontrolled: Story = {
  render: () => (
    <Checkbox defaultChecked name="notifications">
      Уведомления
    </Checkbox>
  ),
};

export const Success: Story = {
  args: { children: "Квест завершён", checked: true, color: "success" },
};
export const SuccessIndeterminate: Story = {
  args: { children: "Выбрать все", indeterminate: true, color: "success" },
};
export const QuestList: Story = {
  render: function Render() {
    const [completed, setCompleted] = useState([true, true, true, false]);
    const tasks = [
      "Написать Vision и анализ",
      "Провести CustDev (55 анкет)",
      "Составить User Story Map",
      "Защитить макеты всех экранов",
    ];
    return (
      <div
        style={{
          display: "grid",
          gap: "var(--sp-2)",
          width: 360,
          maxWidth: "100%",
        }}
      >
        {tasks.map((task, index) => (
          <Block
            key={task}
            variant={completed[index] ? "success" : "muted"}
            padding="sm"
            radius="md"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--sp-2)",
            }}
          >
            <Checkbox
              color="success"
              checked={completed[index]}
              onChange={(checked) =>
                setCompleted((previous) =>
                  previous.map((value, i) => (i === index ? checked : value)),
                )
              }
            >
              <span
                style={{
                  display: "block",
                  maxWidth: 240,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--weight-bold)",
                }}
              >
                {index + 1}. {task}
              </span>
            </Checkbox>
            <Chip kind="status" tone="success" variant="outline">
              +{index === 3 ? 100 : 50} XP
            </Chip>
          </Block>
        ))}
      </div>
    );
  },
};

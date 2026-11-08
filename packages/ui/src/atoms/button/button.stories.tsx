import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./button";
import { Icon } from "../icon";

const meta = {
  title: "Atoms/Button",
  component: Button,
  args: {
    children: "Начать квест",
    variant: "primary",
    size: "md",
    onClick: fn(),
  },
  argTypes: {
    children: { control: "text" },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "ghost",
        "destructive",
        "success",
      ],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isPending: { control: "boolean" },
    isIconOnly: { control: "boolean" },
    disableRipple: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
    await expect(button).toHaveAttribute("type", "button");
  },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "+ Позвать", size: "sm" },
};
export const Tertiary: Story = {
  args: { variant: "tertiary", children: "Экспорт JSON", size: "sm" },
};
export const Ghost: Story = {
  args: { variant: "ghost", children: "Включить", size: "sm" },
};
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Удалить в 1 клик",
    size: "sm",
  },
};
export const Success: Story = {
  args: {
    variant: "success",
    children: (
      <>
        <Icon name="check" />
        Готово! Перейти к квестам
      </>
    ),
    size: "lg",
  },
};
export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Icon name="play" fill="currentColor" />
      Начать квест
    </Button>
  ),
};
export const IconOnly: Story = {
  args: {
    isIconOnly: true,
    "aria-label": "Назад",
    children: <Icon name="chevron-left" />,
  },
};
export const Disabled: Story = {
  args: { isDisabled: true, children: "Ещё 70", size: "sm" },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
export const Pending: Story = {
  args: { isPending: true },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toHaveAccessibleName("Начать квест");
  },
};
export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: "padded" },
};
export const WithoutRipple: Story = { args: { disableRipple: true } };
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button {...args} size="sm">
        Забрать
      </Button>
      <Button {...args} size="md">
        Начать квест
      </Button>
      <Button {...args} size="lg">
        Начать квест
      </Button>
    </div>
  ),
};

export const ReferenceGallery: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 20,
        maxWidth: 360,
        padding: 24,
        background: "#f8fafc",
      }}
    >
      <Button fullWidth>
        <Icon name="play" fill="currentColor" />
        Начать квест
      </Button>
      <Button variant="success" size="lg" fullWidth>
        <Icon name="check" />
        Готово! Перейти к квестам
      </Button>
      <Button variant="secondary" size="sm">
        Включить
      </Button>
      <Button size="sm">Забрать</Button>
      <Button isDisabled size="sm">
        Ещё 70
      </Button>
      <Button variant="destructive" size="sm">
        Удалить в 1 клик
      </Button>
      <Button variant="tertiary" size="sm" fullWidth>
        Экспорт JSON
      </Button>
      <Button variant="secondary" size="sm">
        + Позвать
      </Button>
      <Button variant="secondary" size="sm">
        + Позвать
      </Button>
    </div>
  ),
};

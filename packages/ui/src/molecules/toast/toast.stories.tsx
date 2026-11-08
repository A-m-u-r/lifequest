import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Icon } from "../../atoms/icon";
import { Toast } from "./toast";

const meta = {
  title: "Molecules/Toast",
  component: Toast,
  args: {
    type: "success",
    message: (
      <>
        Отличная работа! Начислено +40 XP и +20{" "}
        <Icon name="lq-coin" size={14} />
      </>
    ),
    duration: 0,
    onClose: fn(),
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["info", "success", "warning", "error"],
    },
    duration: { control: { type: "number", min: 0, step: 1000 } },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Reward: Story = {};
export const Info: Story = {
  args: { type: "info", message: "Новый квест добавлен" },
};
export const Warning: Story = {
  args: { type: "warning", message: "До конца серии осталось 2 часа" },
};
export const ErrorToast: Story = {
  args: {
    type: "error",
    message: "Не удалось сохранить изменения",
    closable: true,
  },
};
export const WithTitle: Story = {
  args: {
    title: "Квест завершён",
    message: (
      <>
        Начислено +40 XP и +20 <Icon name="lq-coin" size={14} />
      </>
    ),
  },
};
export const Closable: Story = { args: { closable: true } };
export const AutoDismiss: Story = { args: { duration: 4000 } };
export const LongMessage: Story = {
  args: {
    message:
      "Ты сделал ещё один шаг к своей цели. Отличная работа! Продолжай в своём темпе — твой прогресс сохранён.",
    closable: true,
  },
};

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropZone } from "./drop-zone";
import type { DropZoneFile } from "./drop-zone-context";

const meta = {
  title: "Molecules/DropZone",
  component: DropZone,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: { children: null },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 460 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropZone accept=".pdf,.docx,.png,.jpg" maxSize={10 * 1024 * 1024}>
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Перетащите файлы сюда или нажмите</DropZone.Label>
        <DropZone.Description>
          PDF, DOCX, PNG или JPG до 10 МБ.
        </DropZone.Description>
        <DropZone.Trigger>Выбрать файлы</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input />
      <DropZone.FileList />
    </DropZone>
  ),
};

export const ComposedTemplate: Story = {
  render: () => (
    <DropZone
      defaultItems={[
        {
          id: "1",
          name: "Proposal.pdf",
          size: 2_456_000,
          status: "done",
          progress: 100,
        },
        {
          id: "2",
          name: "design.fig",
          size: 5_100_000,
          status: "uploading",
          progress: 48,
        },
      ]}
    >
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Drag files here or click to browse</DropZone.Label>
        <DropZone.Description>
          PDF, DOCX, PNG, or JPG up to 10 MB.
        </DropZone.Description>
        <DropZone.Trigger>Select files</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input />
      <DropZone.FileList>
        <DropZone.FileItem>
          <DropZone.FileFormatIcon />
          <DropZone.FileInfo>
            <DropZone.FileName>Proposal.pdf</DropZone.FileName>
            <DropZone.FileMeta>2.4 MB</DropZone.FileMeta>
          </DropZone.FileInfo>
          <DropZone.FileProgress>
            <DropZone.FileProgressTrack>
              <DropZone.FileProgressFill />
            </DropZone.FileProgressTrack>
          </DropZone.FileProgress>
          <DropZone.FileRetryTrigger />
          <DropZone.FileRemoveTrigger />
        </DropZone.FileItem>
      </DropZone.FileList>
    </DropZone>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [items, setItems] = useState<DropZoneFile[]>([]);
    return (
      <DropZone items={items} onItemsChange={setItems}>
        <DropZone.Area>
          <DropZone.Icon />
          <DropZone.Label>Добавьте файлы квеста</DropZone.Label>
          <DropZone.Trigger />
        </DropZone.Area>
        <DropZone.Input />
        <DropZone.FileList />
      </DropZone>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DropZone
      disabled
      defaultItems={[
        {
          id: "1",
          name: "archive.zip",
          size: 2_456_000,
          status: "done",
          progress: 100,
        },
      ]}
    >
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Загрузка недоступна</DropZone.Label>
        <DropZone.Description>Дедлайн домашки уже прошёл.</DropZone.Description>
        <DropZone.Trigger>Выбрать файлы</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input />
      <DropZone.FileList />
    </DropZone>
  ),
};

export const Retry: Story = {
  render: function Render() {
    const [items, setItems] = useState<DropZoneFile[]>([
      {
        id: "retry",
        name: "report.pdf",
        size: 1024,
        status: "error",
        error: "Сбой сети",
      },
    ]);
    return (
      <DropZone
        items={items}
        onItemsChange={setItems}
        onRetry={(id) =>
          setItems((previous) =>
            previous.map((item) =>
              item.id === id
                ? { ...item, status: "done", progress: 100, error: undefined }
                : item,
            ),
          )
        }
      >
        <DropZone.FileList />
      </DropZone>
    );
  },
};

import type { Preview } from "@storybook/react-vite";
import "../src/tokens.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <div id="portals" />
      </>
    ),
  ],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

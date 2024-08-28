import type { Meta, StoryObj } from "@storybook/react";

import Alert from "./Alert";

const meta = {
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Task name is empty!",
  },
};

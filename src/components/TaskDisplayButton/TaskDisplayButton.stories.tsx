import type { Meta, StoryObj } from '@storybook/react';

import TaskDisplayButton from './TaskDisplayButton';

const meta = {
  component: TaskDisplayButton,
} satisfies Meta<typeof TaskDisplayButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Task"
  }
};
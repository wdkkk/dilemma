import type { Meta, StoryObj } from '@storybook/react';

import Workspace from './Workspace';

const meta = {
  component: Workspace,
} satisfies Meta<typeof Workspace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
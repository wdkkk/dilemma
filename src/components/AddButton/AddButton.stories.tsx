import type { Meta, StoryObj } from '@storybook/react';

import AddButton from './AddButton';

const meta = {
  component: AddButton,
} satisfies Meta<typeof AddButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
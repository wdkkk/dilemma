import type { Meta, StoryObj } from '@storybook/react';

import ButtonList from './ButtonList';

const meta = {
  component: ButtonList,
} satisfies Meta<typeof ButtonList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
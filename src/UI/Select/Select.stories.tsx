import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ["light", "dark"]
  }
};
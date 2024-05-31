import { fn } from '@storybook/test';
import { Button } from '.';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export const Primary = {
  args: {
    color: 'blue',
    children: 'Button',
  },
};

export const Secondary = {
  args: {
    color: 'gray',
    children: 'Button',
  },
};
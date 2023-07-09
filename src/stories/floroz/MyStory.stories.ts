import type { Meta, StoryObj } from '@storybook/vue3';
import Component from './Component.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/Autodocs',
  component: Component,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
 
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MyStory: Story = {
  args: {
    a: ' a value ',
    b: 10,
  },
};
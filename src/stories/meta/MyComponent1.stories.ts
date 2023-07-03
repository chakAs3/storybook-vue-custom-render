import type { Meta, StoryObj } from '@storybook/vue3';

import { MyCompo1 } from './MyComponents.ts';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/My Component 1',
  component: MyCompo1,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [()=>({  template: '<div style="background-color: pink;padding:10px;border:2px solid black"><story/></div>' })]
} satisfies Meta<typeof MyCompo1>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
   size: 'medium',
   backgroundColor: 'red',
  },
};

export const Secondary: Story = {
  args: {
    size: 'large',
    c
  },
};


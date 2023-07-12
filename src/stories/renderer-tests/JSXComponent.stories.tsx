import type { Meta, StoryObj, VueRenderer } from '@storybook/vue3';
import type { DecoratorFunction, PlayFunctionContext } from "@storybook/types"


import { JSXComponent } from './JSXComp';
import { RESET_STORY_ARGS, STORY_ARGS_UPDATED, UPDATE_STORY_ARGS } from '@storybook/core-events';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const playFn = async ({ canvasElement, id }: PlayFunctionContext<any>) => {
  const channel = (globalThis as any).__STORYBOOK_ADDONS_CHANNEL__;

  const canvas = within(canvasElement);

  await channel.emit(RESET_STORY_ARGS, { storyId: id });
  await new Promise((resolve) => channel.once(STORY_ARGS_UPDATED, resolve));

  expect(canvas.getByRole('button').innerHTML).toContain('initial label');

  await channel.emit(UPDATE_STORY_ARGS, {
    storyId: id,
    updatedArgs: {
      label: 'updated label',
    },
  });
  await new Promise((resolve) => channel.once(STORY_ARGS_UPDATED, resolve));

  expect(canvas.getByRole('button').innerHTML).toContain('updated label');
};

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const decorators:DecoratorFunction<VueRenderer>[] =[]// [(storyFn)=> h('div',{style:{border:'2px solid red',padding:'20px'}} ,h(storyFn()) )]
const meta = {
  title: 'renderer tests/JSX Component',
  component: JSXComponent,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  decorators,
  play: playFn,
} satisfies Meta<typeof JSXComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
 

export const JSXSyntax: Story = {
  args: {
    label: 'initial label',
  },
  render(args) {
    return <JSXComponent {...args} />;
  }
};


export const OptionsApiComponent: Story = {
  args:{
    label: 'initial label',
  },
  render(args , { argTypes }) {
    return ({
      props: Object.keys(argTypes),
      data: () => ({ args }),
      components: { JSXComponent },
      template: `<div><JSXComponent v-bind="args" /></div>`
    });
  }  
}


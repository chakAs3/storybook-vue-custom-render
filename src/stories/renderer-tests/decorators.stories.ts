

import type { Decorator, Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import { expect } from '@storybook/jest';

import  Button from './Button.vue'; 

import {  PlayFunctionContext } from '@storybook/types';
import { within } from '@storybook/testing-library';
import { RESET_STORY_ARGS, STORY_ARGS_UPDATED, UPDATE_STORY_ARGS } from '@storybook/core-events';



const playFn = async ({ canvasElement, id , args }: PlayFunctionContext<any>) => {
  const channel = (globalThis as any).__STORYBOOK_ADDONS_CHANNEL__;

  const canvas = within(canvasElement);

  await channel.emit(RESET_STORY_ARGS, { storyId: id });
  await new Promise((resolve) => channel.once(STORY_ARGS_UPDATED, resolve));

  expect(canvas.getByRole('button')?.innerHTML).toContain('initial label');

  await channel.emit(UPDATE_STORY_ARGS, {
    storyId: id,
    updatedArgs: {
      label: 'updated label',
    },
  });
  await new Promise((resolve) => channel.once(STORY_ARGS_UPDATED, resolve));
  console.log(' args ===== ', args)
 
  expect(canvas.getByRole('button')?.innerHTML).toContain( args.condition ? 'decorated(updated label)':'updated label');

};

const meta = {
  component: Button,
  // play: playFn,
  title: 'renderer tests/decorators',
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta & { condition:boolean}>;



const SimpleTemplateWrapper:Decorator = ( story ) => ({
  template: `
    <div style="border: 5px solid red;">
      <story/>
    </div>
    `,
});

const VueWrapperWrapper: Decorator = (storyFn, context) => {
  // Call the `storyFn` to receive a component that Vue can render
  const story = storyFn();
  // Vue 3 "Functional" component as decorator
  return () => {
    return h('div', { style: 'border: 5px solid blue' }, h(story, context.args));
  };
};

const DynamicWrapperWrapper: Decorator = (story, { args }) => ({

  template: `<div :style="{ borderWidth: level, borderColor: 'green', borderStyle: 'solid' }"><story /></div>`,
  computed: { level: () => `${args.level}px` },
});



export const SimpleTemplate: Story = {
  args: { label: 'initial label With border' },
  decorators: [SimpleTemplateWrapper],
};

export const VueWrapper: Story = {
  args: { label: 'initial label With Vue wrapper' },
  decorators: [VueWrapperWrapper],
};

export const DynamicWrapper: Story = {
  args: { label: 'initial label With dynamic wrapper', primary: true },
  argTypes: {
    // Number type is detected, but we still want to constrain the range from 1-6
    level: { control: { type: 'range', min: 1, max: 6 } },
  },
  decorators: [DynamicWrapperWrapper],
};

export const MultipleWrappers: Story = {
  args: { label: 'initial label With multiple wrappers' },
 
  decorators: [
    SimpleTemplateWrapper,
    VueWrapperWrapper,
    DynamicWrapperWrapper,
  ]
};


export const ConditinalFalseDecorator : Story = {
  args: { label: 'initial label', condition: false },
  
  decorators: [
   (storyFn, context) => {
   
    return storyFn({ args: { label: `decorated(${context.args['label']})` } });
  },
  
   (storyFn, context) => (context.args.condition ? storyFn() : null)
]
,
play: playFn
};

export const ConditinalTrueDecorator : Story = {
  args: { label: 'initial label', condition: true },
  
  decorators: [
   (storyFn, context) => {
   
    return storyFn({ args: { label: `decorated(${context.args['label']})` } });
  },
  // conditional decorator, runs before the above

  (storyFn, context) => (context.args.condition ? storyFn() : null)
]

};

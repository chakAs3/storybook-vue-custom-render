import type { Meta, StoryObj, VueRenderer } from '@storybook/vue3';
import type { DecoratorFunction } from "@storybook/types"
import {  h } from "vue";

import { JSXComponent } from './JSXComp';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const decorators:DecoratorFunction<VueRenderer>[] =[]// [(storyFn)=> h('div',{style:{border:'2px solid red',padding:'20px'}} ,h(storyFn()) )]
const meta = {
  title: 'Example/JSX Component',
  component: JSXComponent,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  decorators
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
    label: ' Label from Story Args passed to JSXComponent',
  },
  render(args) {
    return <JSXComponent {...args} />;
  }
};

export const HRenderFunction: Story = {
  args:{
    label: ' Rendered Using h() function',
  },
  render(args) {
    return h(JSXComponent, args);
  },

}

export const CompositionApiComponent: Story = {
  args:{
    label: ' Rendered using Composition Component ',
  },
  render(args) {
    return ({
      components: { JSXComponent },
      setup(props, { attrs }){
        return { props , args , attrs}
    }, 
      template: `<pre>{{ JSON.stringify(args)}}</pre> 
                 <JSXComponent v-bind="args"  />` 
    });
  }  
}


export const OptionsApiComponent: Story = {
  args:{
    label: ' Rendered usingComposition Component ',
  },
  render(args , { argTypes }) {
    return ({
      props: Object.keys(argTypes),
      data: () => ({ args }),
      components: { JSXComponent },
      template: `<pre>{{ JSON.stringify(args)}}</pre><JSXComponent v-bind="args" />`
    });
  }  
}


import type { Meta, StoryObj, VueRenderer } from '@storybook/vue3';
import type { ArgTypes, Args, DecoratorFunction } from "@storybook/types"
import {  h, ref, shallowReactive } from "vue";

import { JSXComponent } from './JSXComp.tsx';
import VueComponent from './Button.vue';

const currentCom = shallowReactive<{component:any }>({component:( 1 === 1 )? VueComponent:JSXComponent})
const MyComponent =  currentCom.component

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const decorators:DecoratorFunction<VueRenderer>[] = [(storyFn)=> h('div',{style:{border:'2px solid red',padding:'20px'}} ,h(storyFn) )]
const meta = {
  title: 'Example/Dynamic Component',
  component:MyComponent,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  decorators
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const CompositionApiComponent: Story = {
  args:{
    label: 'Dynamic Component(JSX,SFC-template) ',
  },
  render(args: Args) {
    return ({
      components: { MyComponent },
      setup(props: any, { attrs }: any){
        
    
        const counter = ref(4)
       
        const toggle = () => { 

          currentCom.component = currentCom.component === VueComponent ? JSXComponent : VueComponent
        }
        return { props , args , counter  , attrs ,toggle ,  component:currentCom}
    }, 
      template: `<button class="storybook-button storybook-button--small" @click="toggle">switch component</button> <br/> <br/>
                 <component :is="component.component" v-bind="args" :counter="counter" @incrementCounter="(value)=> counter = value " />` 
    });
  }  
}




export const OptionsApiComponent: Story = {
  args:{
    label: 'Dynamic Component(JSX,SFC-template)',
  },
  render(args:Args , { argTypes }: ArgTypes) {
    return ({
      props: Object.keys(argTypes),
      data: () => ({ args , currentCom }),
      components: { MyComponent },
      template: `<component :is="currentCom.component" v-bind="args" />`
    });
  }  
}


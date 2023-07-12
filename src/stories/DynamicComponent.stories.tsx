import type { Meta, StoryObj, VueRenderer } from '@storybook/vue3';
import type { ArgTypes, Args, DecoratorFunction } from "@storybook/types"
import {  ref, shallowReactive } from "vue";

import MySwitcher from '../components/Switcher.vue';
import { JSXComponent } from './JSXComp.tsx';
import VueComponent from './Button.vue';


const currentCom = shallowReactive<{component:any }>({component:( 1 === 1 )? VueComponent:JSXComponent})
const MyComponent =  currentCom.component

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const decorators:DecoratorFunction<VueRenderer>[] =[]// [(storyFn)=> h('div',{style:{border:'2px solid red',padding:'20px'}} ,h(storyFn) )]
const meta = {
  title: 'Example/Dynamic Component',
  component:MyComponent,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  decorators
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const toggle = () => { 
  currentCom.component = currentCom.component === VueComponent ? JSXComponent : VueComponent
}

export const CompositionApiComponent: Story = {
  args:{
    label: 'Dynamic Component(JSX,SFC-template) ',
  },
  render(args: Args) {
    return ({
      components: { MyComponent  , MySwitcher},
      setup(props: any, { attrs }: any){
        const counter = ref(0)
        return { props , args , counter  , attrs ,toggle ,  component:currentCom}
    }, 
      template: `<div class="storybook with-border">
                  <h2>Composition Api Component</h2>
                  <my-switcher @toggle="toggle" on="JSXComponent" off="SFCComponent" />
                  <component :is="component.component" v-bind="args" :counter="counter" @incrementCounter="(value)=> counter = value " />
                 </div>` 
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
      data: () => ({ args , currentCom , toggle}),
      components: { MyComponent, MySwitcher },
      template: `<div class="storybook with-border">
                  <h2>Options Api Component</h2>
                  <my-switcher @toggle="toggle" on="JSXComponent" off="SFCComponent" />
                  <component :is="currentCom.component" v-bind="args" />
                 </div>`
    });
  }  
}


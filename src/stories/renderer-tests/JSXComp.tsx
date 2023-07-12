import {  defineComponent } from 'vue';
import '../button.css'

export const JSXComponent = defineComponent({
  props: { 
    /** 
     * label for the JSXComponent
     */
    label: String,
    /**
     * counter for the JSXComponent
     * @default 0
     * @type Number
     * @example 1
     */
    counter: Number 
  },  
  name: 'JSXComponent',

  setup(props ) {
    
  

    return () => (
      <>
       <div class="storybook sb-column" >
        <h4>JSX Component</h4>
        <button role='button' class='storybook-button storybook-button--small' > {props.label}</button>

       </div>
      </>
    );
  },
});

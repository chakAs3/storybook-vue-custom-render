import { withModifiers, defineComponent, ref } from 'vue';
import './button.css'

export const JSXComponent = defineComponent({
  props: { 
    label: String,
    counter: Number 
  },  
  name: 'JSXComponent',
  emits: ['incrementCounter'],
  setup(props , { emit }) {
    
    console.log('JSXComponent',props)
    const counter = ref(props.counter ?? 0 ); 
    const inc = () => {

       
        emit('incrementCounter', counter.value++ )
    };

    return () => (
      <>
       <div  class="storybook sb-column" >
        <h4>JSX Component</h4>
        <div class="sb-row">
            <button class='storybook-button storybook-button--large' > { props.label } </button>  
            <span class="storybook-button storybook-button--smal" onClick={withModifiers(inc, ['self'])} style="background:beige;padding:10px" > counter { counter.value } </span>
            <p>shared state from the story</p>
        </div>     
       </div>
      </>
    );
  },
});

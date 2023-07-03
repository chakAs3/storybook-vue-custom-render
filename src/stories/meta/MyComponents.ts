 import { PropType, defineComponent, h  } from "vue";

export const MyCompo1  = defineComponent({
  name: 'MyCompo1',
  props: {
    /**
     * This is a description of the prop
     * @values 'small', 'medium', 'large'
     * @defaultValue 'medium'
     * @control select
     * @group Size
     * */
    size: { 
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
    },
    /**
     * This is a description of the prop
     * @defaultValue false
     * @control color
     * @group Style
     * */
    backgroundColor: {
      type: String,
      default: 'red',
    },
  },
  setup(props) {
    console.log('props', props)
  
    return () => h('pre', JSON.stringify(props, null, 2));
  }
});

export const MyCompo2  = defineComponent({
  name: 'MyCompo2',
  props: {
    /**
     * This is a description of the prop
     * @values true, false
     * @defaultValue false
     * @control boolean
     * @group Size
     * */
    primary: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return () => h('pre', JSON.stringify(props, null, 2));
  }
});

export const MyCompo3  = defineComponent({
  name: 'MyCompo3',
  props: {
    /**
     * This is a description of the prop
     * @defaultValue 'Button'
     * @control text
     * @group Size
     * */
    label: {
      type: String,
      default: 'Button',
    },
  },
  setup(props) {
    return () => h('pre', JSON.stringify(props, null, 2));
  }
});

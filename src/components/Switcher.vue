<template>
    <button class="storybook-button storybook-button--small" @click="toggle">
        switch to {{ selectedComponent === on ? off:on }}
    </button>  
</template>


<script lang="ts" setup>

import { ref } from 'vue';

const props = defineProps<{
    on: string
    off: string
}>()

const toggle = () => {
    selectedComponent.value = selectedComponent.value === props.on ? props.off : props.on
    emits('toggle')
  }
const  selectedComponent = ref(props.off)
const emits = defineEmits<{(event:"toggle"):void}>() 
</script>
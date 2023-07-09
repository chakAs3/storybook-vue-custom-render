<template>
  <div class="storybook sb-column"> 
    <h4> SFC Component </h4>
    <p>{{ JSON.stringify(props) }} </p> 
 </div>
</template>

<script lang="ts" setup>

import type { Props } from '../types';

const props = defineProps<Props & {
  /**
   * description of prop b
   */
   b:number
  
  }>();

</script>
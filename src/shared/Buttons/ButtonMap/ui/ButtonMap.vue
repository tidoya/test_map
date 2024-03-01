<template>
  <button :class="$style.button" v-bind="$props">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ButtonPropsTypes } from "../types/ButtonMapTypes";

const props = defineProps<ButtonPropsTypes>();
</script>
<style module lang="stylus">
.button
  width 30px
  height 30px
  user-select none
  border 1px solid rgba(0,0,0,0.2)
  border-radius 5px
  color #808080
  background-color rgba(0,0,0,0)
  cursor pointer
  transition all 0.2s ease-out
.button:active
  background-color #1C1C1C
  color #fff
</style>
../types/ButtonMapTypes

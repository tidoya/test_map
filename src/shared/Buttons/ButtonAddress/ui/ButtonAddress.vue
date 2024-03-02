<template>
  <button :class="$style.button" v-bind="$props">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ButtonAddressTypes } from "../types/ButtonAddressTypes";

const props = defineProps<ButtonAddressTypes>();
</script>
<style module lang="stylus">
.button
  display flex
  align-items flex-end
  cursor pointer
  color #808080
  margin 0
  padding 0 0 2px 0
  border none
  font inherit
  color inherit
  background-color transparent
  border-radius 4px
  box-shadow 0 0 0 rgba(0, 0, 0, 0)
  transition box-shadow 0.3s ease
  &:hover
    box-shadow 0 1px 0px rgba(128, 128, 128, 0.5)
  &:active
   transform scale(0.99)
</style>

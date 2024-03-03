<template>
  <button :class="$style.button" v-bind="$props">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ButtonTypes } from "../../globalButtonTypes/types";
defineProps<ButtonTypes>();
</script>
<style module lang="stylus">
.button
  background none
  border none
  color inherit
  font inherit
  cursor pointer
  padding 0
  margin 0
  user-select none
.button:active
  transform scale(0.9)
</style>

<template>
  <input
    :class="$style.input"
    v-bind="$props"
    v-model="props.vModel"
    type="checkbox"
  />
</template>
<script setup lang="ts">
import { InputTypes } from "../../globalInputsTypes/types";
const props = defineProps<InputTypes>();
console.log(props, "propsCheckBox");
</script>
<style module lang="stylus">
@keyframes fadeInCheckbox {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.input
  -webkit-appearance none
  -moz-appearance none
  appearance none
  width 20px
  height 20px
  background-color #808080
  border 1px solid #808080
  border-radius 3px
  cursor pointer
  position relative
  &:checked::after
    content '\2713'
    font-size 22px
    color #ffffff
    position relative
    left 2px
    top -7px
    animation fadeInCheckbox 0.5s forwards
</style>

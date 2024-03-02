<template>
  <div :class="$style.wrapper__itemList">
    <div :class="$style.header">
      <h3 :class="$style.header__title">Точка №{{ props.index + 1 }}</h3>
      <p :class="$style.header__code">
        Код: {{ props.features.properties?.code }}
      </p>
    </div>
    <div :class="$style.content">
      <img src="../../../assets/icons/location.svg" />
      <p :class="$style.content__address">
        {{ props.features.properties?.address }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListItemTypes } from "../model/types/ListItemTypes";
import { ref, reactive } from "vue";

const editing = ref(false);
const editedText = ref("");

const handleEdit = () => {
  editing.value = true;
  editedText.value = initialText.value;
};
function save() {
  initialText.value = editedText.value;
  editing.value = false;
}
const props = defineProps<ListItemTypes>();
console.log(props, "propsList");
</script>
<style module lang="stylus">
.wrapper__itemList
  display flex
  flex-direction column
  margin 5px 0 10px 0
.header
  display flex
  gap 10px
  margin 5px 0
  &__title
    display flex
    margin 0
    font-size 1rem
  &__code
    display flex
    align-items center
    color #808080
    margin 0
.content
  display flex
  &__address
    color #808080
    margin 0
</style>

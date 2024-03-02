<template>
  <div :class="$style.wrapper__itemList">
    <div :class="$style.header">
      <h3 :class="$style.header__title">Точка №{{ props.index + 1 }}</h3>
      <p :class="$style.header__code">
        Код: {{ props.features.properties?.code }}
      </p>
    </div>
    <div :class="$style.content">
      <ButtonAddress @click="handleClickAddress">
        <img src="../../../assets/icons/location.svg" />
        {{ props.features.properties?.address }}
      </ButtonAddress>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonAddress from "@/shared/Buttons/ButtonAddress/ui/ButtonAddress.vue";
import { ListItemTypes } from "../model/types/ListItemTypes";
import { useFeaturesMap } from "@/app/store/featuresMap";

const storeFeaturesMap = useFeaturesMap();

const handleClickAddress = (e: Event) => {
  e.preventDefault();
  if (props.checked) {
    console.log(props, "address checked");
    storeFeaturesMap.setActiveSingleFeature(props);
  } else {
    //Показать модальное окно
    console.log(props, "address not checked");
  }
};

const props = defineProps<ListItemTypes>();
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
</style>

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
        <img src="@/assets/icons/location.svg" />
        {{ props.features.properties?.address }}
      </ButtonAddress>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonAddress from "@/shared/Buttons/ButtonAddress/ui/ButtonAddress.vue";
import { ListItemTypes } from "../model/types/ListItemTypes";
import { useFeaturesMap } from "@/app/store/featuresMap";
import { useInstanceMap } from "@/app/store/instanceMap";
import { coordinateTypes } from "@/app/store/featuresMap/types/types";

const storeFeaturesMap = useFeaturesMap();
const storeInstanceMap = useInstanceMap();

const handleClickAddress = (e: Event) => {
  e.preventDefault();
  if (props.checked) {
    storeFeaturesMap.setActiveSingleFeature(props);
    storeInstanceMap.openModalAtCoordinates(
      props.features.geometry.coordinates as coordinateTypes,
      { ...props.features.properties }
    );
  } else {
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

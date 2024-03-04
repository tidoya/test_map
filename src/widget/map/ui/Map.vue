<template>
  <section :class="$style.wrapper">
    <div
      ref="mapContainer"
      :class="$style.wrapper__map"
      :style="props.styles"
    ></div>
    <div :class="$style.container__buttons">
      <ButtonMap
        v-for="button in buttonConstants"
        :key="button.name"
        @click="() => changeZoom(button.typeAction)"
        >{{ button.name }}</ButtonMap
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import ButtonMap from "@/shared/Buttons/ButtonMap/ui/ButtonMap.vue";

import { ref, onMounted, CSSProperties, Ref, computed, watch } from "vue";
import { ButtonMapEnums } from "@/shared/Buttons/ButtonMap/types/enums/ButtonMapEnums";

import { buttonConstants } from "../model/constants/constants";
import { useInstanceMap } from "@/app/store/instanceMap/index";
import { useFeaturesMap } from "@/app/store/featuresMap";
import { coordinateTypes } from "@/app/store/featuresMap/types/types";

const props = defineProps<{
  CoordsCenter: coordinateTypes;
  styles?: CSSProperties;
}>();

const storeInstanceMap = useInstanceMap();
const instanceMap = computed(() => storeInstanceMap.getInstanceMap);

const storeFeaturesMap = useFeaturesMap();
const FilteredFeatureObj = computed(
  () => storeFeaturesMap.getFilteredFeaturesMap
);
const activeFeatures = computed(() => storeFeaturesMap.getActiveFeaturesMap);

const mapContainer: Ref<HTMLElement | null> = ref(null);

const changeZoom = (typeZoom: ButtonMapEnums) => {
  switch (typeZoom) {
    case ButtonMapEnums.zoomIn:
      instanceMap.value?.zoomIn();
      break;
    case ButtonMapEnums.zoomOut:
      instanceMap.value?.zoomOut();
      break;
    default:
      break;
  }
};
watch(
  () => activeFeatures.value,
  async (newVal) => {
    await storeInstanceMap.setFeaturesInMap(newVal);
  },
  { deep: true }
);
onMounted(async () => {
  mapContainer.value &&
    (await storeInstanceMap.setInstanceMap(
      mapContainer.value,
      props.CoordsCenter
    ));
  storeFeaturesMap.toggleActiveFeature(FilteredFeatureObj.value[0]);
  storeFeaturesMap.setActiveSingleFeature(FilteredFeatureObj.value[0]);
});
</script>
<style module lang="stylus">
.wrapper
  cursor pointer
  position relative
  margin auto 0
.container__buttons
  position absolute
  top calc(50% - 32.5px)
  right 5px
  display flex
  flex-direction column
  gap 5px
</style>

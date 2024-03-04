<template>
  <section :class="$style.wrapper">
    <HeaderList :feature-obj-length="filteredFeaturesMap.length" />
    <ul :class="$style.content">
      <q-virtual-scroll
        :style="{
          maxHeight: '560px',
          overflow: 'auto',
        }"
        :items="filteredFeaturesMap"
        v-slot="{ item, index }"
        separator
        :class="$style.virtual_scroll"
      >
        <li :class="$style.item__container">
          <label
            :key="item.id"
            :class="[
              $style.item__label,
              item.id === activeSingleFeature?.id && $style.item__label__active,
            ]"
          >
            <input
              v-model="item.checked"
              type="checkbox"
              :class="$style.input"
              @click="() => handeleClickActiveFeature(item)"
            />
            <ListItem
              v-bind="{
                ...item,
                index,
              }"
            />
          </label>
        </li>
      </q-virtual-scroll>
    </ul>
  </section>
</template>

<script setup lang="ts">
import ListItem from "@/entities/ListItem/ui/ListItem.vue";

import { useFeaturesMap } from "@/app/store/featuresMap";
import { useInstanceMap } from "@/app/store/instanceMap";
import {
  coordinateTypes,
  featureChekedTypes,
} from "@/app/store/featuresMap/types/types";
import { computed, onMounted, watch } from "vue";
import HeaderList from "@/entities/HeaderList/ui/HeaderList.vue";

const storeInstanceMap = useInstanceMap();

const featuresStore = useFeaturesMap();
const filteredFeaturesMap = computed(
  () => featuresStore.getFilteredFeaturesMap
);

const activeSingleFeature = computed(
  () => featuresStore.getActiveSingleFeaturesMap
);

const handeleClickActiveFeature = (feature: featureChekedTypes) => {
  if (!feature.checked) featuresStore.toggleActiveFeature(feature);
  else {
    featuresStore.deleteActiveFeatures(feature);
    storeInstanceMap.removeAllModalWindow();
  }
};

watch(
  () => activeSingleFeature.value,
  async () => {
    if (activeSingleFeature.value)
      storeInstanceMap.setActiveFeatureInMap(
        activeSingleFeature.value.features.geometry
          .coordinates as coordinateTypes
      );
  },
  { deep: true }
);

onMounted(() => {
  featuresStore.setRandomFeatures(10000);
});
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
.wrapper
  display flex
  flex-direction column
  min-width 500px
  min-height 700px
.header
  display flex
  justify-content space-between
  &__btnSection
    display flex
    gap 5px
    align-items center
  &__title
    font-size 30px
    margin 0
  &__content
    display flex
    align-items center
    gap 5px
    cursor pointer
    margin-bottom 5px
.content
  width 100%
  height 600px
  padding 0
  margin 0
.item
  &__container
    padding 10px 0
  &__label
    display flex
    align-items center
    gap 30px
    cursor pointer
    border 1px solid #808080
    border-radius 10px
    height 100%
    &__active
      border-color #FFF
.label
  cursor pointer
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
.virtual_scroll
  padding-right 5px
.virtual_scroll::-webkit-scrollbar
  width 12px
.virtual_scroll::-webkit-scrollbar-track
  background black
.virtual_scroll::-webkit-scrollbar-thumb
  background #888
  border-radius 6px
  cursor pointer

.virtual_scroll::-webkit-scrollbar-thumb:hover
  background #555
</style>

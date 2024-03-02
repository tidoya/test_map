<template>
  <section :class="$style.wrapper">
    <h1 :class="$style.header">Точки</h1>
    <div :class="$style.header__content">
      <input
        type="checkbox"
        name="all"
        id="all"
        :class="$style.input"
        v-model="allChecked"
        @click="hangleClickCheckbox"
      />
      <label :class="$style.label" for="all"
        >Выбрать все ({{ featureObj.length }})</label
      >
    </div>
    <ul :class="$style.content">
      <q-virtual-scroll
        :style="{
          maxHeight: '560px',
          overflow: 'auto',
        }"
        :items="featureObj"
        v-slot="{ item, index }"
        separator
        :class="$style.virtual_scroll"
      >
        <li :class="$style.item__container">
          <label :key="item.id" :class="$style.item__label">
            <input
              v-model="item.checked"
              type="checkbox"
              :class="$style.input"
              @click="() => handeleClickActiveFeature(item)"
            />
            {{ console.log(item) }}
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
import { featureChekedTypes } from "@/app/store/featuresMap/types/types";
import { computed, onMounted, ref } from "vue";

const featuresStore = useFeaturesMap();
const featureObj = computed(() => featuresStore.getFeaturesMap);

const allChecked = ref(false);

const hangleClickCheckbox = () => {
  featuresStore.setAllCheckedFeatures(!allChecked.value);
};

const handeleClickActiveFeature = (feature: featureChekedTypes) => {
  if (!feature.checked) featuresStore.toggleActiveFeature(feature);
  else featuresStore.deleteActiveFeatures(feature);
};

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
  overflow hidden
  opacity 0
  animation fadeInCheckbox 0.5s forwards
  &:checked::after
    content '\2713'
    font-size 22px
    color #ffffff
    position relative
    left 2px
    top -7px
    animation fadeInCheckbox 0.5s forwards
</style>

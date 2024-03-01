<template>
  <section :class="$style.wrapper">
    <List />
    <Map
      v-bind="{
        CoordsCenter: MoscowCoordinate,
      }"
      :styles="{ width: '600px', height: '600px' }"
    />
  </section>
</template>

<script setup lang="ts">
import Map from "@/widget/map/ui/Map.vue";
import List from "@/widget/list/ui/List.vue";

import { MoscowCoordinate } from "../model/constants/constants";
</script>

<style module lang="stylus">
.wrapper
  display flex
  flex-direction row
  gap 20px
  justify-content space-between
  padding 15px
  border 2px solid #808080
  min-width 600px
  min-height 400px
  border-radius 10px
  transition all 0.5s ease-out
.wrapper:hover
  box-shadow 0px 0px 50px rgba(128, 128, 128, 0.7)
</style>

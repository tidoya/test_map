<template>
  <div :class="$style.wrapper">
    <div
      ref="mapContainer"
      :class="$style.wrapper__map"
      :style="props.styles"
    ></div>
    <button @click="zoomIn">Приблизить</button>
    <button @click="zoomOut">Отдалить</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, CSSProperties } from "vue";
import maplibregl from "maplibre-gl";

const props = defineProps<{
  CoordsCenter: [number, number];
  styles?: CSSProperties;
}>();
const mapContainer = ref();

const zoomIn = () => {
  if (map) {
    map.zoomIn();
  }
};

const zoomOut = () => {
  if (map) {
    map.zoomOut();
  }
};

onMounted(() => {
  new maplibregl.Map({
    container: mapContainer.value,
    // if not work, update key https://cloud.maptiler.com/account/keys/
    style:
      "https://api.maptiler.com/maps/streets/style.json?key=3Z2h4Nzf4q0xcpcVIVZi",
    center: props.CoordsCenter,
    zoom: 8,
  });
  mapContainer.value.querySelector("canvas").style.borderRadius = "15px";
  mapContainer.value.querySelector(
    ".maplibregl-ctrl-bottom-right"
  ).style.display = "none";
});
</script>
<style module lang="stylus">
.wrapper
  cursor pointer
</style>

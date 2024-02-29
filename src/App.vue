<template>
  <main :class="$style.container">
    <MainPage />
  </main>
</template>

<script setup lang="ts">
import MainPage from "@/pages/MainPage/ui/MainPage.vue";
</script>

<style module lang="stylus">
.container
  display flex
  align-items center
  justify-content center
  height 100%
</style>

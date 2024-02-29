<template>
  <section :class="$style.wrapper">
    <h1 :class="$style.header">Точки</h1>
    <div></div>
  </section>
</template>

<script setup lang="ts"></script>
<style module lang="stylus">
.wrapper
  display flex
  flex-direction column
  min-width 500px
  min-height 700px
.header
  font-size 30px
  margin 0
</style>

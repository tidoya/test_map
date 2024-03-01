<template>
  <section :class="$style.wrapper"></section>
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
.wrapper__list
  display flex
  flex-direction column
  gap 30px
.label
  cursor pointer
</style>

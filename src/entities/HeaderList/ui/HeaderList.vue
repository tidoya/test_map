<template>
  <div>
    <div :class="$style.header">
      <h1 :class="$style.header__title">Точки</h1>
      <div :class="$style.header__btnSection">
        <input
          v-if="isSearch"
          type="text"
          placeholder="Введите имя точки..."
          v-model="searchTerm"
        />
        <ButtonIcon @click="toggleSearch">
          <img src="@/assets/icons/search.svg" alt="searchIcon" />
        </ButtonIcon>
      </div>
    </div>
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
        >Выбрать все ({{ props.featureObjLength }})</label
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFeaturesMap } from "@/app/store/featuresMap";
import { useInstanceMap } from "@/app/store/instanceMap";
import ButtonIcon from "@/shared/Buttons/ButtonIcon/ui/ButtonIcon.vue";
import { onMounted, ref, watch } from "vue";
import { debounce } from "quasar";

const props = defineProps<{
  featureObjLength: number;
}>();

const storeInstanceMap = useInstanceMap();
const featuresStore = useFeaturesMap();

const isSearch = ref(false);
const allChecked = ref(false);
const searchTerm = ref("");

const toggleSearch = () => {
  isSearch.value = !isSearch.value;
  if (!isSearch.value) {
    searchTerm.value = "";
  }
};
const hangleClickCheckbox = () => {
  featuresStore.setAllCheckedFeatures(!allChecked.value);
  if (allChecked.value) storeInstanceMap.removeAllModalWindow();
};

watch(
  searchTerm,
  debounce(() => {
    console.log("debounce");
    featuresStore.filterFeatures(searchTerm.value);
  }, 300)
);
onMounted(() => {
  featuresStore.filterFeatures("");
});
</script>

<style module lang="stylus">
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
</style>

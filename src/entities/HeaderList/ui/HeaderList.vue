<template>
  <div>
    <div :class="$style.header">
      <h1 :class="$style.header__title">Точки</h1>
      <div :class="$style.header__btnSection">
        <input v-if="isSearch" type="text" />
        <ButtonIcon @click="() => (isSearch = !isSearch)">
          <img src="@/assets/icons/search.svg" alt="searchIcon" />
        </ButtonIcon>
      </div>
    </div>
    <div :class="$style.header__content">
      <CheckBoxListInput
        name="all"
        id="all"
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
import CheckBoxListInput from "@/shared/Inputs/CheckBoxListInput/ui/CheckBoxListInput.vue";
import { ref } from "vue";

const storeInstanceMap = useInstanceMap();
const featuresStore = useFeaturesMap();

const isSearch = ref(false);
const allChecked = ref(false);

const hangleClickCheckbox = () => {
  featuresStore.setAllCheckedFeatures(!allChecked.value);
  if (allChecked.value) storeInstanceMap.removeAllModalWindow();
};
const props = defineProps<{
  featureObjLength: number;
}>();
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
</style>

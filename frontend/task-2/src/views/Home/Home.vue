<template>
  <app-ui-wrapper>
    <app-title
      title="HP Character Browser"
      subtitle="Meet the characters of the HP novel"
    />
    <form @submit.prevent="filtering">
      <div class="form-fields-wrapper">
        <app-input
          id="name"
          v-model="name"
          placeholder="Wyszukaj po imieniu i nazwisku"
        />
        <app-select
          :options="allCharactersNames"
          id="allCharacters"
          v-model="selectedType"
        />
        <app-select
          :options="allCharactersHouses"
          id="allCharacters"
          v-model="selectedHouse"
        />
      </div>
      <div class="buttons-wrapper">
        <app-icon-button isSearch :icon="SearchIcon" type="submit" />
        <app-icon-button isClear :icon="ClearIcon" @click="onClearForm" />
      </div>
    </form>
    <div class="search-label-wrapper">
      <p>Wyniki wyszukiwania ({{ searchResultsValue }})</p>
    </div>
    <app-character-card-wrapper
      v-if="allCharacters && sortedCharacters.length <= 0"
    >
      <app-character-card
        v-for="character in allCharacters"
        :key="character.name"
        :character="character"
      />
    </app-character-card-wrapper>
    <app-character-card-wrapper v-else>
      <app-character-card
        v-for="character in sortedCharacters"
        :key="character.name"
        :character="character"
      />
    </app-character-card-wrapper>
  </app-ui-wrapper>
</template>

<script>
import { onMounted, ref, watch } from "vue";

import AppTitle from "@/components/AppTitle/AppTitle.vue";
import AppCharacterCard from "@/components/AppCharacterCard/AppCharacterCard.vue";
import AppCharacterCardWrapper from "@/components/AppCharacterCardWrapper/AppCharacterCardWrapper.vue";
import AppUiWrapper from "@/components/AppUiWrapper/AppUiWrapper.vue";

import AppInput from "@/components/AppInput/AppInput.vue";
import AppSelect from "@/components/AppSelect/AppSelect.vue";
import AppIconButton from "@/components/AppIconButton/AppIconButton.vue";

import SearchIcon from "@/assets/icon-search.svg";
import ClearIcon from "@/assets/icon-clear.svg";

import {
  allCharactersNames,
  allCharactersHouses,
} from "@/consts/characterFilters.js";

import {
  getAllCharacters,
  sortList,
  setDefaultImageCharacter,
  getTotalResultsValue,
  housesFilter,
  typeFilter,
} from "@/utils/characters.js";

export default {
  name: "Home",
  components: {
    AppTitle,
    AppCharacterCard,
    AppCharacterCardWrapper,
    AppUiWrapper,
    AppInput,
    AppSelect,
    AppIconButton,
  },
  setup() {
    const allCharacters = ref([]);
    const sortedCharacters = ref([]);
    const name = ref("");
    const selectedType = ref("");
    const selectedHouse = ref("");
    const searchResultsValue = ref(0);

    const filtering = () => {
      if (selectedHouse.value && !selectedType.value && !name.value) {
        sortedCharacters.value = housesFilter(
          allCharacters,
          selectedHouse.value,
          sortedCharacters
        );
      }

      if (!selectedHouse.value && selectedType.value && !name.value) {
        sortedCharacters.value = typeFilter(
          allCharacters,
          selectedType.value,
          sortedCharacters
        );
      }

      if (selectedHouse.value && selectedType.value && !name.value) {
        const sortedByHouse = ref(
          housesFilter(allCharacters, selectedHouse.value, sortedCharacters)
        );

        const sortedByType = typeFilter(
          sortedByHouse,
          selectedType.value,
          sortedCharacters
        );

        sortedCharacters.value = [...sortedByHouse, ...sortedByType];
      }
    };

    const onClearForm = () => {
      name.value = "";
      selectedType.value = "";
      selectedHouse.value = "";
    };

    watch([allCharacters, sortedCharacters], () => {
      if (sortedCharacters.value.length > 0) {
        const resultOfCharacters = getTotalResultsValue(sortedCharacters.value);
        searchResultsValue.value = resultOfCharacters;
        return;
      }

      const resultOfCharacters = getTotalResultsValue(allCharacters.value);
      searchResultsValue.value = resultOfCharacters;
    });

    onMounted(async () => {
      const { data } = await getAllCharacters();

      if (data) {
        const setDefaultImages = setDefaultImageCharacter(data);
        const sortedAlphabetCharacters = sortList(setDefaultImages);

        return (allCharacters.value = sortedAlphabetCharacters);
      }
    });

    return {
      allCharacters,
      sortedCharacters,
      allCharactersNames,
      allCharactersHouses,
      SearchIcon,
      ClearIcon,
      name,
      selectedType,
      selectedHouse,
      searchResultsValue,
      filtering,
      onClearForm,
    };
  },
};
</script>

<style lang="scss" src="./index.scss" scoped />

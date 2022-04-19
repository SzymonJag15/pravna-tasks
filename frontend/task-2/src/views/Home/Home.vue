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
          v-model="selectedName"
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
    <app-character-card-wrapper>
      <app-character-card
        v-for="character in allCharacters"
        :key="character.name"
        :character="character"
      />
    </app-character-card-wrapper>
  </app-ui-wrapper>
</template>

<script>
import { onMounted, ref } from "vue";

import AppTitle from "@/components/AppTitle/AppTitle.vue";
import AppCharacterCard from "@/components/AppCharacterCard/AppCharacterCard.vue";
import AppCharacterCardWrapper from "@/components/AppCharacterCardWrapper/AppCharacterCardWrapper.vue";
import AppUiWrapper from "@/components/AppUiWrapper/AppUiWrapper.vue";

import mockData from "@/assets/mockData.json";
import AppInput from "@/components/AppInput/AppInput.vue";
import AppSelect from "@/components/AppSelect/AppSelect.vue";
import AppIconButton from "@/components/AppIconButton/AppIconButton.vue";

import SearchIcon from "@/assets/icon-search.svg";
import ClearIcon from "@/assets/icon-clear.svg";

import { getAllCharacters } from "@/utils/characters.js"

export default {
  name: "Home",
  components: {
    AppTitle,
    AppCharacterCard,
    AppCharacterCardWrapper,
    AppUiWrapper,
    AppInput,
    AppSelect,
    AppIconButton
  },
  setup() {
    const allCharacters = ref(mockData);
    const allCharactersNames = [
      "Wszystkie postaci",
      ...allCharacters.value.map((character) => character.name),
    ];
    const allCharactersHouses = [
      "Wszystkie domy",
      ...new Set(allCharacters.value.map((character) => character.house)),
    ];

    const name = ref("");
    const selectedName = ref("");
    const selectedHouse = ref("");
    const searchResultsValue = ref(allCharacters.value.length);

    const filtering = () => {
      console.log(name.value, selectedName.value, selectedHouse.value);
    };

    const onClearForm = () => {
      name.value = "";
      selectedName.value = "";
      selectedHouse.value = "";
    };

    onMounted(async () => {
      const { data } = await getAllCharacters();

      console.log(data)
    })

    return {
      allCharacters,
      allCharactersNames,
      allCharactersHouses,
      SearchIcon,
      ClearIcon,
      name,
      selectedName,
      selectedHouse,
      searchResultsValue,
      filtering,
      onClearForm,
    };
  },
};
</script>

<style lang="scss" src="./index.scss" scoped />

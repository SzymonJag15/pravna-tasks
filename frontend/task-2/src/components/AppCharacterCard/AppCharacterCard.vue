<template>
  <div class="app-character-card" v-if="character">
    <div class="app-character-card__img-wrapper">
      <img :src="character.image" alt="hermiona" class="image" />
    </div>
    <div class="app-character-card__info-wrapper">
      <p class="character-name">{{ character.name }}</p>
      <div class="character-detail">
        <div class="icon-gryf"></div>
        <p class="info">{{ character.house }}</p>
      </div>
      <div class="character-detail">
        <img src="static\img\icon-birthday-cake.svg" alt="" />
        <p class="info">{{ convertCommaToDot(character.dateOfBirth) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppCharacterCard",
  props: {
    character: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const convertCommaToDot = (data) => data.replace(/-/g, ".");

    return {
      convertCommaToDot,
    };
  },
};
</script>

<style lang="scss" src="./index.scss" scoped />

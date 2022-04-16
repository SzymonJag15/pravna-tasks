<template>
  <div class="app-title-section">
    <h1 class="app-title-section__title" v-text="title" />
    <h3 class="app-title-section__subtitle" v-text="subtitle" />
  </div>
</template>

<script>
export default {
  name: "AppTitle",
  props: {
    title: {
      type: String,
      default: "Tytuł",
    },
    subtitle: {
      type: String,
      default: "Podtytuł",
    },
  },
};
</script>

<style lang="scss" src="./index.scss" scoped />

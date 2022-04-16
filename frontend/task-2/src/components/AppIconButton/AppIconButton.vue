<template>
  <button
    class="app-icon-button"
    :class="{
      'app-icon-button--clear': isClear,
      'app-icon-button--search': isSearch,
    }"
    :type="type"
  >
    <img :src="icon" alt="" />
  </button>
</template>

<script>
export default {
  name: "AppIconButton",
  props: {
    isSearch: {
      type: Boolean,
      default: false,
    },
    isClear: {
      type: Boolean,
      default: false,
    },
    type: String,
    icon: String,
  },
};
</script>

<style lang="scss" src="./index.scss" scoped />

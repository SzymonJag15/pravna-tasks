<template>
  <select
    class="app-select"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: "AppSelect",
  props: {
    id: String,
    options: Array,
    selected: String,
  },
};
</script>

<style lang="scss" src="./index.scss" scoped />

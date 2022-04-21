<template>
  <select
    class="app-select"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option v-for="option in options" :key="option" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "AppSelect",
  props: {
    id: String,
    options: Array,
  },
};
</script>

<style lang="scss" src="./index.scss" scoped />

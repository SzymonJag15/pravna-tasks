<template>
  <input
    class="app-input"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    :id="id"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: "AppInput",
  props: {
    id: String,
    modelValue: String,
    placeholder: String,
  },
};
</script>

<style lang="scss" src="./index.scss" scoped />

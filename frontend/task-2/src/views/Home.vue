<template>
  <div>Home</div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Home',
  setup() {
    const test = ref('asdasd');

    onMounted(() => {
      console.log(test.value)
    });
  }
};
</script>
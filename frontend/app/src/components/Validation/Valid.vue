<template>
  <div class="valid">
    <ul>
      <li v-for="error in error" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Validation",
  props: { error: Object },
};
</script>

<style lang="scss" scoped>
.valid {
  font-size: medium;
  color: red;
}
</style>

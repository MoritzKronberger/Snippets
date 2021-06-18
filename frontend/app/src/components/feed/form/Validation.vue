<template>
  <div class="valid">
    <ul>
      <li v-for="error in errors" :key="error">{{ error }} required</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Validation",
  props: { validation: Object },
  computed: {
    ...mapState("post", ["errors"]),
  },
};
</script>

<style lang="scss" scoped>
.valid {
  font-size: medium;
  color: red;
}
</style>

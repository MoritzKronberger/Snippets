<template>
  <div class="valid">
    <ul>
      <li v-for="error in error" :key="error">{{ error }}</li>
    </ul>
    <p>{{ report }}</p>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Validation",
  props: { error: Object },
  computed: {
    ...mapState("auth", ["report"]),
  },
};
</script>

<style lang="scss" scoped>
.valid {
  font-size: medium;
  color: red;
}
</style>

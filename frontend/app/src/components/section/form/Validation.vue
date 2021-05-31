<template>
  <body>
    <div class="valid">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }} required</li>
      </ul>
    </div>
  </body>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "Validation",
  props: { validation: Object },
  computed: { ...mapState({ errors: "errors" }) },
};
</script>

<style lang="scss" scoped>
.valid {
    font-size: medium;
    color: red;
}
</style>
<template>
  <div class="flex-container">
    <div v-for="lang in languages" :key="lang.id">
        <Language :language="lang" />
    </div>
  </div>
</template>

<script>
import Button from "../../Button.vue";
import Language from "./Language.vue";
import { mapState } from "vuex";
export default {
  name: "Languages",
  components: { Button, Language },
  computed: {
    ...mapState("post", ["languages"]),
  },
};
</script>

<style lang="scss" scoped>
.flex-container > div {
  margin: 0 1%;
}
</style>

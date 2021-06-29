<template>
  <div class="flex-container">
    <div v-for="lang in languages" :key="lang.id">
      <Button :label="lang.name" btn_class="small" @click="addLang(lang.id)" />
    </div>
  </div>
</template>

<script>
import Button from "../../Button.vue";
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Languages",
  components: { Button },
  computed: {
    ...mapState("post", ["languages"]),
    ...mapFields("post", ["input_post"]),
  },
  methods: {
    addLang(lang_id) {
      this.input_post.language_id = lang_id;
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-container > div {
  margin: 0 1%;
}
</style>

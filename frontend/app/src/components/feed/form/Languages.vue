<template>
  <body>
    <section class="flex-container">
      <div v-for="lang in lang_object" :key="lang.id">
      <Button :label="lang.name" btn_class="small" @click="addLang(lang.id)" />
      </div>
    </section>
  </body>
</template>

<script>
import Button from "../../Button.vue";
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Languages",
  props: { languages: Object },
  components: { Button },
  computed: {
    ...mapState("post", ["lang_object"]),
    ...mapFields("post", ["post"]),
  },
  methods: {
    addLang(lang_id) {
      this.post.lang_id = lang_id;
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-direction: row;
}

.flex-container > div {
  margin: 0 2%;
  width: 10%;
}
</style>
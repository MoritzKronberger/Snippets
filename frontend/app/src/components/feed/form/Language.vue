<template>
  <Button :label="language.name" :btn_class="select" @click="addLang" />
</template>

<script>
import Button from "../../Button.vue";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Language",
  components: { Button },
  props: { language: Object },
  computed: {
    ...mapFields("post", ["input_post"]),

    select: function() {
      return this.input_post.language_id == this.language.id
        ? "small select"
        : "small";
    },
  },
  methods: {
    addLang() {
      this.input_post.language_id = this.language.id;
    },
  },
};
</script>


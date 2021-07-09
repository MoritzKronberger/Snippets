<template>
  <div>
    <div v-if="isAuthorized" :class="vis_Add(false)">
      <Button label="add Post" btn_class="addButton" @click="setActive" />
    </div>
    <div v-else class="content form">
      <h2>Hello! Login to post, comment and like!</h2>
    </div>
    <div :class="vis_Form(true)">
      <form>
        <Button label="DISCARD" btn_class="small discard" @click="setActive" />
        <p>Select Language</p>
        <Languages />
        <Input :post="input_post" />
        <Validation
          :object="input_post"
          button_name="Create new Post"
          @click="submitPost"
          type="Post"
        />
      </form>
    </div>
  </div>
</template>
<script>
import Button from "../../Button.vue";
import Languages from "./Languages";
import Validation from "../../validation/Form.vue";
import Input from "./Input";
import { mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Form",
  components: { Button, Languages, Validation, Input },
  computed: {
    ...mapGetters("form", ["vis_Add", "vis_Form"]),
    ...mapGetters(["isAuthorized"]),
    ...mapFields("post", ["input_post"]),
    ...mapFields("form", ["section"]),
  },
  methods: {
    setActive() {
      for (let prop in this.input_post) {
        this.input_post[prop] = null;
      }
      this.$store.commit("form/setActive");
    },
    submitPost() {
      this.$store.dispatch("post/postPost").then(() => {
        this.$store.dispatch("post/getPosts");
      });
      this.$store.commit("form/setActive");
    },
  },
};
</script>
<style lang="scss" scoped></style>

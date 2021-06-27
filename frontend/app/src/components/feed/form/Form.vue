<template>
  <div>
    <div :class="vis_Add(false)">
      <Button label="add Post" btn_class="addButton" @click="setActive" />
    </div>
    <div :class="vis_Form(true)">
      <form>
        <Button label="DISCARD" btn_class="small discard" @click="setActive" />
        <p>Select Language</p>
        <Languages />
        <Input :post="post" />
        <Validation :object="post" button_name="Submit" @click="submitPost"/>
      </form>
    </div>
  </div>
</template>
<script>
import Button from "../../Button.vue";
import Languages from "./Languages";
import Validation from "../../validation/Form.vue"
import Input from "./Input";
import { mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Form",
  components: { Button, Languages, Validation, Input },
  computed: {
    ...mapGetters("form", ["vis_Add", "vis_Form"]),
    ...mapFields("post", ["post"]),
    ...mapFields("form", ["section"]),
  },
  methods: {
    setActive() {
      this.$store.commit("form/setActive");
    },
    submitPost() {
      this.$store.commit("post/newPost");
      this.$store.commit("form/setActive");
    },
  },
};
</script>
<style lang="scss" scoped></style>

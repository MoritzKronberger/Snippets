<template>
  <body>
    <div>
      <div :class="vis_FormPost(false)">
        <Button label="add Post" btn_class="medium" @click="setActive" />
      </div>
      <section :class="vis_FormPost(true)">
        <form>
          <Button label="DISCARD" btn_class="small discard" @click="setActive" />
          <p>Select Language</p>
          <Languages />
          <Input :post="post" />
          <Validation />
          <Button label="submit" btn_class="medium" @click="submitPost" />
        </form>
      </section>
    </div>
  </body>
</template>
<script>
import Button from "../../Button.vue";
import Languages from "./Languages";
import Validation from "./Validation";
import Input from "./Input";
import { mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Form",
  components: { Button, Languages, Validation, Input },
  computed: {
    ...mapGetters("post", ["vis_FormPost"]),
    ...mapFields("post", ["section", "post"]),
  },
  methods: {
    setActive() {
      this.section = !this.section;
    },
    submitPost() {
      this.$store.commit("post/newPost");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

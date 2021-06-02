<template>
  <body>
    <div>
      <div :class="vis_FormPost(false)">
        <Button label="add Post" btn_class="medium" @click="setActive" />
      </div>
      <section :class="vis_FormPost(true)">
        <form>
          <Button label="X" btn_class="small discard" @click="setActive" />
          <p>Select Language</p>
            <section
              class="input languages"
              v-for="lang in lang_object"
              :key="lang.id"
            >
              <Languages :languages="lang" @click="addLang(lang.id)" />
            </section>
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
import { mapGetters, mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Form",
  components: { Button, Languages, Validation, Input },
  computed: {
    ...mapState("post", ["lang_object"]),
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

    addLang(lang_id) {
      this.post.lang_id = lang_id;
    },
  },
};
</script>


<style lang="scss" scoped>

.flex-container {
  display: flex;
  background-color: DodgerBlue;
}

.flex-container > section {
  background-color: #f1f1f1;
  margin: 10px;
  padding: 20px;
  font-size: 30px;
}
</style>

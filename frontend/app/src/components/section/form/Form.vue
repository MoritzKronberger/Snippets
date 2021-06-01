<template>
  <body>
    <div>
      <Button label="add Post" btn_class="addButton" @click="setActive" />
      <section :class="vis_FormPost(true)">
        <form>
          <p>Select Language</p>
          <Button label="X" btn_class="small" />
          <div>
            <section
              class="input languages"
              v-for="lang in lang_object"
              :key="lang.id"
            >
              <Languages :languages="lang" @click="addLang(lang.id)" />
            </section>
          </div>
          <div>
            <input
              v-model="post.title"
              class="input"
              autofocus="autofocus"
              placeholder="title"
            />
            <textarea
              v-model="post.content"
              class="input code"
              placeholder="code input"
            />
            <input
              v-model="post.category"
              class="input"
              placeholder="add or create new category"
            />
          </div>
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
import { mapGetters, mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Form",
  components: { Button, Languages, Validation },
  computed: {
    ...mapState('post', ["lang_object"]),
    ...mapGetters('post', ["vis_FormPost"]),
    ...mapFields('post', ["section", "post", "errors"]),
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
<style lang="scss" scoped></style>

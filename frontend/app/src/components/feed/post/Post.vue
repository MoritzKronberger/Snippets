<template>
  <body>
    <div class="content post">
      <Description :post="post" />
      <Prism :prism="post" :lang_name="lang_object[post.lang_id].name" />
      <Button :label="section_state" btn_class="view" @click="setActive()" />
      <div :class="vis_Comment">
        <Comments :comments="post" />
        <input class="input" v-model="new_comment" type="text" />
        <Button label="comment" btn_class="" @click="addComment()" />
        <Button
          :label="'Likes: ' + post.likes"
          btn_class="small"
          @click="addLike()"
        />
        <Validation />
      </div>
    </div>
  </body>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import Comments from "./Comments.vue";
import Description from "./Description.vue";
import Button from "../../Button.vue";
import Prism from "./Prism.vue";
import Validation from "../form/Validation.vue";
export default {
  name: "Post",
  data: function() {
    return {
      section_state: "view",
    };
  },
  props: { post: Object },
  components: { Comments, Button, Description, Prism, Validation },
  computed: {
    vis_Comment() {
      return this.post.id !== this.active_id ? "hidden" : "";
    },
    ...mapFields("post", ["new_comment", "active_id"]),
    ...mapState("post", ["lang_object"]),
  },
  methods: {
    addComment() {
      this.$store.commit("post/addComment", this.post.id);
      this.new_comment = "";
    },

    setActive() {
      if (this.post.id !== this.active_id) {
        this.active_id = this.post.id;
        this.section_state = "collapse";
      } else {
        this.active_id = null;
        this.section_state = "view";
      }
    },

    addLike() {
      this.$store.commit("post/addLike", this.post.id);
    },
  },
};
</script>
<style lang="scss" scoped></style>

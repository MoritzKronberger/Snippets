<template>
  <body>
    <div class="content post">
      <Description :post="post" />
      <Prism :prism="post" :lang_name="lang_object[post.lang_id].name" />
      <Interaction :post="post" />
      <div :class="vis_Comment">
        <div :class="setOverFlow">
          <Comments :comments="post" />
        </div>
        <input class="input" v-model="new_comment" type="text" />
        <Button label="comment" btn_class="small likes" @click="addComment()" />
        <Button label="Like" btn_class="small" @click="addLike()" />
        <Validation />
      </div>
    </div>
  </body>
</template>
<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import Description from "./Description.vue";
import Comments from "./Comments.vue";
import Button from "../../Button.vue";
import Prism from "./Prism.vue";
import Validation from "../form/Validation.vue";
import Interaction from "./Interaction.vue";
export default {
  name: "Post",
  props: { post: Object },
  components: { Button, Description, Prism, Validation, Interaction, Comments },
  computed: {
    vis_Comment() {
      return this.post.id !== this.active_id ? "hidden" : "";
    },
    setOverFlow() {
      return this.posts[this.post.id].comment.length > 3 ? "overflow" : "";
    },
    ...mapFields("post", ["new_comment", "posts", "active_id"]),
    ...mapState("post", ["lang_object"]),
  },
  methods: {
    addComment() {
      this.$store.commit("post/addComment", this.post.id);
      this.new_comment = "";
    },
    addLike() {
      this.$store.commit("post/addLike", this.post.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.overflow {
  margin-top: 5%;
  overflow-y: scroll;
  height: 300px;
  scrollbar-width: thin; 
}
</style>

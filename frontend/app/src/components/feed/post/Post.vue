<template>
    <div class="content post">
      <Edit :post="post" />
      <Description :post="post" />
      <Prism :prism="post" :lang_name="lang_object[post.lang_id].name" />
      <Interaction :post="post" />
      <div :class="vis_Comment">
        <div :class="setOverFlow">
          <Comments :comments="post" />
        </div>
        <input class="input" v-model="add_comment.comment" type="text" />
      <Validation
        :object="add_comment"
        button_name="comment"
        btn_class="small"
        @click="addComment"
      />
      <Button label="Like" btn_class="small" @click="addLike" />
      </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import Description from "./Description.vue";
import Comments from "./Comments.vue";
import Button from "../../Button.vue";
import Prism from "./Prism.vue";
import Validation from "../../validation/Form.vue";
import Interaction from "./Interaction.vue";
import Edit from "./Edit.vue";
export default {
  name: "Post",
  props: { post: Object },
  components: {
    Button,
    Description,
    Prism,
    Validation,
    Interaction,
    Comments,
    Edit,
  },
  computed: {
    vis_Comment() {
      return this.post.id !== this.active_id ? "hidden" : "";
    },
    setOverFlow() {
      return this.posts[this.post.id].comment.length > 3 ? "overflow" : "";
    },
    ...mapFields("post", ["new_comment", "posts", "active_id", "add_comment"]),
    ...mapState("post", ["lang_object"]),
  },
  methods: {
    addComment() {
      this.$store.commit("post/addComment", this.post.id);
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

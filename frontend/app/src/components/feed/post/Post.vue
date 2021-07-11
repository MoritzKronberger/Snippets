<template>
  <div class="content post">
    <Edit :post="post" />
    <Description :post="post" />
    <Prism :prism="post" :lang_name="post.language" />
    <Interaction :post="post" />
    <div :class="vis_Comment">
      <div :class="setOverFlow">
        <Comments :comments="post" />
      </div>
      <div v-if="isAuthorized">
        <textarea class="input" v-model="comment.content[0].input" />
        <Validation
          :object="comment.content[0]"
          button_name="comment"
          btn_class="small"
          @click="addComment"
          type="Comment"
        />
        <div v-if="post.likedByCurrentUser == true">
          <Button label="Dislike" btn_class="small" @click="deleteLike" />
        </div>
        <div v-else>
          <Button label="Like" btn_class="small" @click="addLike" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
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
      return this.post.num_comments > 3 ? "overflow" : "";
    },
    ...mapFields("post", ["active_id", "comment"]),
    ...mapGetters(["isAuthorized"]),
  },
  methods: {
    addComment() {
      this.$store.dispatch("post/postComment");
      let num = parseInt(this.post.num_comments);
      num++;
      this.post.num_comments = num;
    },
    addLike() {
      this.$store.dispatch("post/postPostLike");
    },
    deleteLike() {
      this.$store.dispatch("post/deletePostLike");
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

textarea {
  width: 100%;
  padding: 10px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  resize: none;
}
</style>

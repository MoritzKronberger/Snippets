<template>
  <body>
    <div class="content post">
      <h4>{{ post.title }}</h4>
      <div class="flex-container">
        <p>Language: {{ lang_object[post.lang_id].name }}</p>
        <p>Date: {{ post.date }}</p>
        <p>Written by: {{ post.author }}</p>       
      </div>
      <Prism :prism="post" :lang_name="lang_object[post.lang_id].name" />
      <Button label="view / collapse" btn_class="small" @click="setActive()" />

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
import Likes from "./Likes.vue";
import Button from "../../Button.vue";
import Prism from "./Prism.vue";
import Validation from "../form/Validation.vue"
export default {
  name: "Post",
  props: { post: Object },
  components: { Comments, Likes, Button, Prism, Validation },
  computed: {
    vis_Comment() {
      return this.post.id !== this.active_id ? "hidden" : "";
    },
    ...mapState("post", ["lang_object"]),
    ...mapFields("post", ["new_comment", "active_id"]),
  },
  methods: {
    addComment() {
      this.$store.commit("post/addComment", this.post.id);
      this.new_comment = "";
    },

    setActive() {
      return this.post.id !== this.active_id
        ? (this.active_id = this.post.id)
        : (this.active_id = null);
    },

    addLike() {
      this.$store.commit("post/addLike", this.post.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-direction: row;
}

.flex-container > p {
  margin-left: 2%;
  font-size: small;
  color: grey;
}
</style>

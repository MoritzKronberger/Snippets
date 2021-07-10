<template>
  <div>
    <p>{{ comment.content }}</p>
    <div class="flex-container">
      <p>User: {{ comment.username }}</p>
      <p>Date: {{ format_date }}</p>
      <p>Likes: {{ comment.num_likes }}</p>
      <div v-if="isAuthorized">
        <div v-if="comment.likedByCurrentUser == true">
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
import Button from "../../Button.vue";
import { mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Comment",
  components: { Button },
  props: { comment: Object },
  data: function() {
    return {
      format_date: new Date(
        this.comment.creation_time.toString()
      ).toLocaleDateString("en"),
    };
  },
  computed: {
    ...mapFields("post", ["active_id"]),
    ...mapGetters(["isAuthorized"]),
  },
  methods: {
    addLike() {
      this.$store.dispatch("post/postCommentLike", this.comment.id);
    },
    deleteLike() {
      this.$store.dispatch("post/deleteCommentLike", this.comment.id);
    },
  },
};
</script>
<style lang="scss">
.flex-container > p {
  margin: 1% 2%;
  font-size: x-small;
}
</style>

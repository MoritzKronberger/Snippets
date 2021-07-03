<template>
  <div>
    <p>{{ comment.content }}</p>
    <div class="flex-container">
      <p>User: {{ comment.username }}</p>
      <p>Date: {{ format_date }}</p>
      <p>Likes: {{ comment.num_likes }}</p>
      <Button label="Like" btn_class="small" @click="addLike" />
    </div>
  </div>
</template>
<script>
import Button from "../../Button.vue";
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
  methods: {
    addLike() {
      this.$store.dispatch("post/postCommentLike", this.comment.id);
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

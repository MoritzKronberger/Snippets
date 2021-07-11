<template>
  <div>
    <div class="comment" v-for="com in comments.comments" :key="com.id">
      <Comment :comment="com" />
    </div>
  </div>
</template>
<script>
import Button from "../../Button.vue";
import Comment from "./Comment.vue";
export default {
  name: "Comments",
  components: { Button, Comment },
  props: { comments: Object },
};
</script>
<style lang="scss">
.comment {
  padding: 2% 2%;
  margin-top: 3%;
  font-size: medium;
  background-color: aliceblue;
  border-radius: 2%;
}
</style>

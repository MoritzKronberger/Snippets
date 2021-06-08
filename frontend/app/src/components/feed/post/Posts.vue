<template>
  <body>
    <section class="flex-container">
    <div v-for="post in posts" :key="post.id">
      <Post :post="post" />
    </div>
    </section>
  </body>
</template>

<script>
import Post from "./Post.vue";
import { mapState } from "vuex";
export default {
  name: "Posts",
  components: { Post },
  computed: { ...mapState("post", ["posts"]) },
};
</script>
<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
}

.flex-container > div {
  margin: 0%;
  margin-top: 5%;
}
</style>
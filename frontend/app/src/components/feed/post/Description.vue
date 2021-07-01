<template>
  <div>
    <h4>{{ post.title }}</h4>
      <div class="flex-container">
        <p>Language: {{ post.language }}</p>
        <p>Date: {{ post.creation_time }}</p>
        <p>Written by: {{ post.username }}</p>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Button from "../../Button.vue";
export default {
  name: "Description",
  props: { post: Object },
  components: { Button },
    computed: {
    ...mapState("post", ["lang_object"]),
  },
};
</script>
<style lang="scss" scoped>
.flex-container > p {
  margin-left: 2%;
  font-size: small;
  color: grey;
}
h4 {
  margin-bottom: 1%;
  margin-left: 2%;
}
</style>
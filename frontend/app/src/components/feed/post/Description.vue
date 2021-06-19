<template>
  <div>
    <h4>{{ post.title }}</h4>
      <div class="flex-container">
        <p>Language: {{ lang_object[post.lang_id].name }}</p>
        <p>Date: {{ post.date }}</p>
        <p>Written by: {{ post.author }}</p>
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
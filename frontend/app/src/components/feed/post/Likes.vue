<template>
  <body>
    <Button
      :label="'Likes: ' + num"
      btn_class="small"
      @click="addLike()"
    />
  </body>
</template>

<script>
/*import Button from "../../Button.vue";
import { mapState } from "vuex";
export default {
  name: "Likes",
  components: { Button },
  props: { likes: Object, num: Integer, },
  computed: { ...mapState("post", [{ posts: "posts" }]) },
};*/
</script>

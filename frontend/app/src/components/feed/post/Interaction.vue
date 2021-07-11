<template>
  <div>
    <div class="flex-container">
      <p>Likes: {{ post.num_likes }}</p>
      <p>Comments: {{ post.num_comments }}</p>
      <Button :label="state" btn_class="small" @click="setActive" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import Button from "../../Button.vue";
export default {
  name: "Interaction",
  props: { post: Object },
  components: { Button },
  computed: {
    ...mapState("post", ["posts"]),
    ...mapFields("post", ["active_id"]),

    state: function() {
      if (this.post.id !== this.active_id) {
        return "view";
      } else {
        return "collapse";
      }
    },
  },
  methods: {
    setActive() {
      if (this.post.id !== this.active_id) {
        this.active_id = this.post.id;
      } else {
        this.active_id = null;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.flex-container > p {
  margin-left: 2%;
  font-size: small;
  color: grey;
}
</style>

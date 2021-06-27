<template>
  <div>
    <div class="flex-container">
      <p>Likes: {{ post.num_likes }}</p>
      <p>Comments: {{ post.num_comments }}</p>
      <Button :label="section_state" btn_class="small" @click="setActive()" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import Button from "../../Button.vue";
export default {
  name: "Interaction",
  data: function() {
    return {
      section_state: "view",
    };
  },
  props: { post: Object },
  components: { Button },
  computed: {
    ...mapState("post", ["posts"]),
    ...mapFields("post", ["active_id"]),
  },
  methods: {
    setActive() {
      if (this.post.id !== this.active_id) {
        this.active_id = this.post.id;
        this.section_state = "collapse";
      } else {
        this.active_id = null;
        this.section_state = "view";
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

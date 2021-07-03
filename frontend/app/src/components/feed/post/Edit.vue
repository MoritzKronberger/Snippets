<template>
  <div v-if="id == post.user_id">
    <Button label="Edit" btn_class="small discard" @click="edit()" />
    <div :class="visEdit">
      <Button label="Delete" btn_class="small delete" @click="deletePost()" />
    </div>
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import { mapState } from "vuex"
import Button from "../../Button.vue";
export default {
  name: "Edit",
  data: function() {
    return {
      edit_state: false,
    };
  },
  components: { Button },
  props: { post: Object },
  computed: {
    visEdit() {
      return this.edit_state !== true ? "hidden" : "";
    },
    ...mapFields("post", ["active_id"]),
    ...mapState({id: "id"}),
  },
  methods: {
    edit() {
      this.edit_state = !this.edit_state;
    },
    deletePost() {
      this.active_id = this.post.id;
      this.$store.dispatch("post/deletePost");
    },
  },
};
</script>

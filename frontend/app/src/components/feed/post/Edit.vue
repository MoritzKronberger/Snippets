<template>
  <div>
    <Button label="Edit" btn_class="small discard" @click="edit()" />
    <div :class="visEdit">
      <Button label="Delete" btn_class="small delete" @click="deletePost()" />
    </div>
  </div>
</template>
<script>
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
  },
  methods: {
    edit() {
      this.edit_state = !this.edit_state;
    },
    deletePost() {
      this.$store.commit("post/deletePost", this.post.id);
    },
  },
};
</script>

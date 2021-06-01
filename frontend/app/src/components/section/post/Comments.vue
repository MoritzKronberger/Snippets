<template>
  <body>
    <div class="content comment">
      <p>{{ comments.message }}</p>
      <Button
        :label="'Likes: ' + comments.likes"
        btn_class="small"
        @click="addLike()"
      />
      <p>{{ comments.author }}</p>
      <p>{{ comments.date }}</p>
      <hr />
    </div>
  </body>
</template>

<script>
import { mapState } from "vuex";
import Button from "../../Button.vue";
import Validation from '../form/Validation.vue';
export default {
  name: "Comments",
  components: { Button, Validation },
  props: { comments: Object },
  computed: { ...mapState('post', [{ posts: "post_object" }]) },
  methods: {
    addLike() {
      this.$store.commit("addLikeComment", this.comments.id);
    },
  },
};
</script>

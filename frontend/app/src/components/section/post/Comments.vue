<template>
  <body>
    <div v-for="com in comments" :key="com.id">
      <div class="content comment">
        <p>{{ com.message }}</p>
        <Button
          :label="'Likes: ' + com.likes"
          btn_class="small"
          @click="addLike(com.id)"
        />
        <p>{{ com.author }}</p>
        <p>{{ com.date }}</p>
        <hr />
      </div>
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
    addLike(com_id) {
      this.$store.commit("post/addLikeComment", com_id);
    },
    
  },
};
</script>

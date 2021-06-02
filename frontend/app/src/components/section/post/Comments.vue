<template>
  <body>
    <div v-for="com in comments.comment" :key="com.id">
      <div class="content comment">
        <p>{{ com.message }}</p>
        <Button
          :label="'Likes: ' + com.likes" btn_class="small" @click="addLike(com.id)"
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
export default {
  name: "Comments",
  components: { Button },
  props: { comments: Object },
  methods: {
    addLike(com_id) {
      console.log(com_id)
      this.$store.commit("post/addLikeComment", com_id);
    },
    
  },
};
</script>

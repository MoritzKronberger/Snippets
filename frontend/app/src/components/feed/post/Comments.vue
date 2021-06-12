<template>
  <body>
    <div class="comment" v-for="com in comments.comment" :key="com.id">
      <p>{{ com.message }}</p>
      <div class="flex-container">
        <Button
          :label="'Likes: ' + com.likes"
          btn_class="small"
          @click="addLike(com.id)"
        />

          <p>{{ com.author }}</p>
          <p>{{ com.date }}</p>


      </div>
    </div>
  </body>
</template>

<script>
import Button from "../../Button.vue";
export default {
  name: "Comments",
  components: { Button },
  props: { comments: Object },
  methods: {
    addLike(com_id) {
      console.log(com_id);
      this.$store.commit("post/addLikeComment", com_id);
    },
  },
};
</script>
<style lang="scss">
.comment {
  padding: 2% 2%;
  margin-top: 3%;
  font-size: medium;
  background-color: aliceblue;
  border-radius: 2%;
}
.flex-container > p {
  margin: 1% 2%;
  font-size: x-small;
}
</style>

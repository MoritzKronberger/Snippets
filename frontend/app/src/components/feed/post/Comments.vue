<template>
  <body>
    <div class="comment" v-for="com in comments.comment" :key="com.id">
        <p>{{ com.message }}</p>
        <div class="flex-container">
        <Button
          :label="'Likes: ' + com.likes" btn_class="small" @click="addLike(com.id)"
        />
        <p>{{ com.author }}</p>
        <p>{{ com.date }}</p>
        </div>
        <hr />
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
      console.log(com_id)
      this.$store.commit("post/addLikeComment", com_id);
    },
    
  },
};
</script>
<style lang="scss">
.comment {
    padding-left: 2%;
    padding-top: 2%;
    margin-left: 0%;
    width: 100%;
    font-size: medium;
    background-color: aliceblue;
  }

.flex-container {
  display: flex;
  flex-direction: row;
}

 .flex-container > p {
  margin: 2% 5%;
  font-size: x-small;
}

</style>
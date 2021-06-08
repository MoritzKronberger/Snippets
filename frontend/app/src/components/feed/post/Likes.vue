<template>
  <body>
    
  </body>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Likes",
  props: { likes: Object },
  computed: { ...mapState('post', [{ posts: "posts" }])},
};
</script>

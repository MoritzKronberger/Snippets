<template>
  <div>
    <input type="text" v-model="user_query" placeholder="search..." @keyup="search" />
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";
export default {
  name: "Searchbar",
  computed:
  {
   ...mapFields("post", ["user_query"]),
  },
  methods: {
    search(p_event) {
      if (p_event.key === "Enter" && this.user_query != null) {
        p_event.preventDefault();
        p_event.stopPropagation();
        this.$store.dispatch("post/getPosts");
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.search);
  },
};
</script>

<style lang="scss" scoped>
input[type="text"] {
  width: 100%;
  padding: 2%;
  margin: 2% 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>

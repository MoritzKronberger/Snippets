<template>
  <div class="header">
    <Searchbar />
    <div v-for="sort in sortings" :key="sort.id">
      <Filter :filter="sort"/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Searchbar from "./Searchbar.vue";
import Filter from "./Filter.vue";
export default {
  name: "Search",
  components: {
    Searchbar,
    Filter,
  },
  computed: { ...mapState("post", ["sortings"]) },
};
</script>
<style lang="scss">
.header {
  width: 50%;
  margin: 0 auto;
  margin-bottom: 7%;
}
</style>

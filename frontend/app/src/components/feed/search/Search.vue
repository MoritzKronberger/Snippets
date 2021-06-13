<template>
  <div class="header">
    <Searchbar />
    <Filter />
  </div>
</template>

<script>
import Searchbar from "./Searchbar.vue";
import Filter from "./Filter.vue";
export default {
  name: "Search",
  components: {
    Searchbar,
    Filter,
  },
};
</script>
<style lang="scss">
.header {
  width: 50%;
  margin: 0 auto;
  margin-bottom: 7%;
}
</style>

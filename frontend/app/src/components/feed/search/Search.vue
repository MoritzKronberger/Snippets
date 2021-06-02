<template>
  <section class="header">
  <Searchbar />
  <Filter />
  </section>
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
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 7%;
}
</style>
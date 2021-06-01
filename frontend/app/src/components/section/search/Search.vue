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

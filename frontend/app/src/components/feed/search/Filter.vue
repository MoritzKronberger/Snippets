<template>
  <div class="center">
    <Button :label="filter.sort_by" btn_class="small" @click="getSorting" />
  </div>
</template>
<script>
import Button from "../../Button.vue";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Filter",
  props: { filter: Object },
  components: { Button },
  computed: {
    ...mapFields("post", ["filter_id"]),
  },
  methods: {
    getSorting() {
      this.filter_id = this.filter.id;
      this.$store.dispatch("reloadPostData");
    },
  },
};
</script>

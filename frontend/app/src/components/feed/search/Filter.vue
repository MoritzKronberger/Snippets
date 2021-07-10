<template>
    <div class="center">
    <Button :label="filter.sort_by" btn_class="small" @click="getSorting" />
    </div>
</template>
<script>
import Button from "../../Button.vue";
export default {
  name: "Filter",
    props: { filter: Object },
    components: { Button },
    methods: 
    {
      getSorting() {
        this.$store.dispatch("reloadPostData", this.filter.id);
      },
    }
};
</script> 
     
     
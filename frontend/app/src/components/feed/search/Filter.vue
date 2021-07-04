<template>
    <div class="center">
    <Button :label="filter.sort_by" btn_class="small" />
    </div>
</template>
<script>
import Button from "../../Button.vue";
export default {
  name: "Filter",
    props: { filter: Object },
    components: { Button },
};
</script> 
     
     
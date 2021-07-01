<template>
    <div class="center">
    <Button label="Most Visited" btn_class="small" />
    <Button label="Recently" btn_class="small" />
    <Button label="Popular" btn_class="small" />
    <Button label="Discussed" btn_class="small" />
    </div>
</template>
<script>
import Button from "../../Button.vue";
export default {
  name: "Filter",
    components: { Button },
};
</script> 
     
     
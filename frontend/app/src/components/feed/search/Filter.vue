<template>
  <body>
    <Button label="Most Visited" btn_class="small" />
    <Button label="Newest" btn_class="small" />
    <Button label="Popular" btn_class="small" />
    <Button label="Discussed" btn_class="small" />
  </body>
</template>
<script>
import Button from "../../Button.vue";
export default {
  name: "Filter",
    components: { Button },
};
</script>
     
     
     
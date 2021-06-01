<template>
  <body>
    <section>
      <input type="text" placeholder="search..." />
    </section>
  </body>
</template>
<script>
export default {
  name: "Searchbar",
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

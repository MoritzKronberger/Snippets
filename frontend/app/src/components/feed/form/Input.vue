<template>
  <body>
    <div>
      <input
        v-model="post.title"
        class="input"
        autofocus="autofocus"
        placeholder="title"
      />
      <textarea
        v-model="post.content"
        class="input code"
        placeholder="code input"
      />
      <input
        v-model="post.category"
        class="input"
        placeholder="#category"
      />
    </div>
  </body>
</template>
<script>
export default {
  name: "Input",
  props: {post: Object},
};
</script>

<style lang="scss" scoped>
</style>

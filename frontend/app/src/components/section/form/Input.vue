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
        placeholder="add or create new category"
      />
    </div>
  </body>
</template>
<script>
export default {
  name: "Input",
  props: {post: String},
};
</script>
<style lang="scss" scoped></style>

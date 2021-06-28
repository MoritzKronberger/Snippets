<template>
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
        v-model="post.categories"
        class="input"
        placeholder="#category"
      />
    </div>
</template>
<script>
export default {
  name: "Input",
  props: {post: Object},
};
</script>

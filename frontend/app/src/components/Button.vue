<template>
  <input
    :value="label"
    :class="'button  ' + btn_class"
    type="button"
    @click="_click"
  />
</template>

<script>
export default {
  name: "Button",
  props: { label: String, btn_class: String },
  methods: {
    _click() {
      this.$emit("click");
    },
  },
  emits: ["click"],
};
</script>

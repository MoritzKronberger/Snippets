<template>
  <body>
    <Button :label="button_name" btn_class="medium" @click="_click" />
    <Validation :error="errors" />
  </body>
</template>
<script>
import Button from "../Button.vue";
import { mapFields } from "vuex-map-fields";
import Validation from "./Validation.vue";
export default {
  name: "Form",
  components: { Button, Validation },
  props: { button_name: String, object: Object },
  data: function() {
    return {
      state: 0,
      errors: [],
    };
  },
  computed: {
    ...mapFields("auth", ["user"]),
  },
  methods: {
    _click() {
      console.log(this.object)
      this.errors = [];
      for (const [key, value] of Object.entries(this.object)) {
        if (value === null) {
          this.errors.push(key);
        }
      }
      this.errors.length != 0 ? null : this.$emit("click");
      for (let prop in this.object) {
        this.object[prop] = null;
      }
    },
  },
  emits: ["click"],
};
</script>
<style lang="scss"></style>

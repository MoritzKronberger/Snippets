<template>
  <div>
    <Button :label="button_name" :btn_class="btn_class" @click="_click" />
    <Validation :error="errors" />
  </div>
</template>
<script>
import Button from "../Button.vue";
import Validation from "./Valid.vue";
export default {
  name: "Form",
  components: { Button, Validation },
  props: { button_name: String, object: Object, btn_class: String },
  data: function() {
    return {
      errors: [],
    };
  },
  methods: {
    _click() {
      let key;
      const obj = {};
      for (key in this.object) {
        obj[key] = this.object[key];
      }
      this.errors = [];

      switch (this.button_name) {
        case "Register":
          obj.password != obj.password_confirm
            ? this.errors.push(
                "Password not confirmed correctly! Please try again"
              )
            : null;

        case "Submit":
          delete obj.category;
      }

      for (const [key, value] of Object.entries(obj)) {
        if (value === null) {
          this.errors.push(key + " required");
        }
      }

      if (this.errors.length != 0) {
        for (let prop in obj) {
          obj[prop] = null;
        }
      } else {
        this.$emit("click");
        for (let prop in this.object) {
          this.object[prop] = null;
        }
      }
    },
  },
  emits: ["click"],
};
</script>
<style lang="scss"></style>

<template>
  <div>
    <Button :label="button_name" :btn_class="btn_class" @click="_click" />
    <Validation :error="errors" />
  </div>
</template>
<script>
import Button from "../Button.vue";
import { mapFields } from "vuex-map-fields";
import Validation from "./Validation.vue";
export default {
  name: "Form",
  components: { Button, Validation },
  props: { button_name: String, object: Object, btn_class: String },
  data: function() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapFields("auth", ["user"]),
  },
  methods: {
    _click() {
      this.errors = [];
      switch (this.button_name) {
        case "Register":
          this.object.password != this.object.password_confirm
            ? this.errors.push(
                "Password not confirmed correctly! Please try again"
              )
            : null;

        case "Submit": //Form Post
          this.object.category == null
            ? (this.object.category = "Default")
            : this.object.category;
      }
      
      for (const [key, value] of Object.entries(this.object)) {
        if (value === null) {
          this.errors.push(key + " required");
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

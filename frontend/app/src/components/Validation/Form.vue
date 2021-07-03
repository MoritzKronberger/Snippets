<template>
  <div>
    <Button :label="button_name" :btn_class="btn_class" @click="_click" />
    <Validation :error="errors" />
  </div>
</template>
<script>
import Button from "../Button.vue";
import Input from "../feed/form/Input.vue";
import Validation from "./Valid.vue";
export default {
  name: "Form",
  components: { Button, Validation, Input },
  props: { button_name: String, object: Object, btn_class: String },
  data: function() {
    return {
      errors: [],
      valid_length: {},
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
          this.valid_length = {
            username: 30,
            password: 20,
            password_confirm: 20,
          };
          obj.password != obj.password_confirm
            ? this.errors.push(
                "Password not confirmed correctly! Please try again"
              )
            : null;
          break;

        case "Submit": //Post Form
          const arr_category = [];
          this.valid_length = { title: 80, content: 1000 };
          if (obj.categories !== null) {
            obj.categories.split(" ").forEach((element) => {
              element.length > 20 ? arr_category.push(element) : null;
            });
            if (arr_category.length > 0) {
              this.errors.push(arr_category + " only 10 characters allowed.");
            }
          }
          delete obj.categories;
          break;

        case "Comment":
          this.len = { comment: 100 };
          break;
      }

      for (const [key, value] of Object.entries(obj)) {
        if (value === null) {
          this.errors.push(key + " required!");
        } else if (value.length > this.valid_length[`${key}`]) {
          this.errors.push(
            key +
              " only " +
              this.valid_length[`${key}`] +
              " characters allowed."
          );
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

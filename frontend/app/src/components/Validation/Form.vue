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
            username: 10,
            password: 20,
            password_confirm: 20,
          };
          obj.password != obj.password_confirm
            ? this.errors.push(
                "Password not confirmed correctly! Please try again"
              )
            : null;
          break;

        case "Submit":
          const arr_category = [];
          if (obj.category !== null) {
            obj.category.split(" ").forEach((element) => {
              element.length > 10 ? arr_category.push(element) : null;
            });
            console.log("test");
            if (arr_category.length > 0) {
              console.log(arr_category);
              this.errors.push(arr_category + " only 10 characters allowed.");
            }
          }
          delete obj.category;
          this.valid_length = { title: 40, content: 400 };
          break;

        case "Comment":
          this.len = { comment: 10 };
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

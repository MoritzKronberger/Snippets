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
import { mapFields } from "vuex-map-fields";
export default {
  name: "Form",
  components: { Button, Validation, Input },
  props: {
    button_name: String,
    object: Object,
    btn_class: String,
    type: String,
  },
  computed: {
    ...mapFields("post", ["input_post"]),
  },
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

      switch (this.type) {
        case "Register":
          this.valid_length = {
            username: 31,
            password: 20,
            password_confirm: 20,
          };
          // unique check min length for registration
          if (obj.password != null) {
            obj.password.length < 6
              ? this.errors.push("Password Minimum is 6 Characters")
              : null;
          }
          // unique check pw confirm
          obj.password != obj.password_confirm
            ? this.errors.push(
                "Password not confirmed correctly! Please try again"
              )
            : null;
          break;

        case "Post": //Post Form
          const error_categories = [];
          const cat_length = 21;
          this.valid_length = { title: 81, content: 1201 };
          // unique categories split and validation
          if (obj.categories !== null) {
            let split_categories = obj.categories.split(" ");
            split_categories.forEach((element) => {
              element.length > cat_length
                ? error_categories.push(element)
                : null;
            });
            if (error_categories.length > 0) {
              this.errors.push(
                error_categories + ` only ${cat_length} characters allowed.`
              );
            } else {
            //  this.input_post.categories = split_categories;
            }
          }
          
          delete obj.categories;
          break;

        case "Comment":
          this.len = { comment: 181 };
          break;
      }
      console.log(obj);
      for (const [key, value] of Object.entries(obj)) {
        if (value === null) {
          this.errors.push(key + " required!");
          // If input is given, then validate length
        } else if (value.length > this.valid_length[`${key}`]) {
          this.errors.push(
            key +
              " only " +
              this.valid_length[`${key}`] +
              " characters allowed."
          );
        }
      }
        /* Validation valid?
        -> Reset input fields
        -> Trigger given function */
       if(this.errors.length == 0) {
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

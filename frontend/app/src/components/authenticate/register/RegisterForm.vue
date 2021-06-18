<template>
  <body>
    <h1>Create Account</h1>
    <Form
      button_name="Confirm"
      auth_type="username_password confirm_password"
      @click="Register"
    />
  </body>
</template>
<script>
import Button from "../../Button.vue";
import Form from "../Form.vue";
export default {
  name: "Register",
  components: { Button, Form },
  methods: {
    Register() {
      this.$store.commit("auth/userRegister");
    },
  },
};
</script>
<style lang="scss"></style>

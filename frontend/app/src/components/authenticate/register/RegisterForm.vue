<template>
  <body>
    <h1>Create Account</h1>
    <Form button_name="Confirm" auth_type="email username_password confirm_password" /> 
  </body>
</template>
<script>
import Button from "../../Button.vue";
import Form from "../Form.vue"
export default {
  name: "Register",
  components: { Button, Form },
};
</script>
<style lang="scss"></style>

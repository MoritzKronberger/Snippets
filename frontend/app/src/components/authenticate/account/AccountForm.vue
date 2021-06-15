<template>
  <body>
    <h1>Profile</h1>
      <Form button_name="Save Profile" auth_type="email username_password" /> 
  </body>
</template>
<script>
import Form from "../Form.vue"
import Button from "../../Button.vue";
export default {
  name: "Account",
  components: {
    Button, Form
  },
};
</script>
<style lang="scss"></style>

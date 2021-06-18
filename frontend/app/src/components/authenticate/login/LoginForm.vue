<template>
  <body>
    <h1>Login</h1>
    <Form
      button_name="Login Profile"
      auth_type="username_password"
      @click="Login"
    />
    <div class="content auth">
      <p>No Account?</p>
      <router-link to="/register">
        <Button label="Register here" btn_class="medium" />
      </router-link>
    </div>
  </body>
</template>

<script>
import Form from "../Form.vue";
import Button from "../../Button.vue";
export default {
  name: "LoginForm",
  components: { Button, Form },
  methods: {
    Login() {
      this.$store.commit("auth/userLogin")
    },
  },
};
</script>
<style lang="scss"></style>

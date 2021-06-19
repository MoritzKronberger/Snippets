<template>
  <body>
    <h1>Login</h1>
    <div class="content auth">
      <Form auth_type="username_password" />
      <Validation :object="user" button_name="Login" @click="Login" btn_class="medium"/>
      <p>No Account?</p>
      <router-link to="/register">
        <Button label="Register here" btn_class="medium" />
      </router-link>
    </div>
  </body>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import Form from "./Form.vue";
import Button from "../Button.vue";
import Validation from "../validation/Form.vue"
export default {
  name: "LoginForm",
  components: { Button, Form, Validation },
  computed: {
    ...mapFields("auth", ["user"]),
  },
  methods: {
    Login() {
      this.$store.commit("auth/userLogin");
    },
  },
};
</script>
<style lang="scss"></style>

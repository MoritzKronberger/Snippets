<template>
  <div>
    <h1>Login</h1>
    <div class="content auth">
      <Form auth_type="username_password" :auth="user" />
      <Validation
        :object="user"
        button_name="Login"
        @click="doLogin"
        btn_class="medium"
      />
      <p>No Account?</p>
      <router-link to="/register">
        <Button label="Register here" btn_class="medium" />
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from "vuex";
import router from "/router";
import Form from "./Form.vue";
import Button from "../Button.vue";
import Validation from "../validation/Form.vue";

export default {
  name: "LoginForm",
  components: { Button, Form, Validation },
  data: function() {
    return { error: false };
  },
  computed: {
    ...mapFields("auth", ["user"]),
  },
  methods: {
    ...mapActions(["login"]),

    async doLogin() {
      this.error = false;
      const success = await this.login();
      this.error = !success;
      if (success) {
        router.push("/");
      }
    },
  },
};
</script>
<style lang="scss"></style>

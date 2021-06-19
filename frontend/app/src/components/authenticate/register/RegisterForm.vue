<template>
  <body>
    <h1>Create Account</h1>
    <div class="content auth">
      <Form
        button_name="Confirm"
        auth_type="username_password confirm_password"
      />
      <Validation
        :object="new_user"
        button_name="Register"
        @click="Register"
        btn_class="medium"
      />
    </div>
  </body>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import Button from "../../Button.vue";
import Form from "../Form.vue";
import Validation from "../../Validation/Form.vue";
export default {
  name: "Register",
  components: { Button, Form, Validation },
  computed: {
    ...mapFields("auth", ["new_user"]),
  },
  methods: {
    Register() {
      this.$store.commit("auth/userRegister");
    },
  },
};
</script>
<style lang="scss"></style>

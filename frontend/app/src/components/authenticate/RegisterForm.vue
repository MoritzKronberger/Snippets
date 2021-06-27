<template>
  <div>
    <h1>Create Account</h1>
    <div class="content auth">
      <Form
        button_name="Confirm"
        auth_type="username_password confirm_password"
        :auth="new_user" 
      />
      <Validation
        :object="new_user"
        button_name="Register"
        @click= "register"
        btn_class="medium"
      />
    </div>
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from 'vuex';
import router  from '/router';
import Button from "../Button.vue";
import Form from "./Form.vue";
import Validation from "../validation/Form.vue"

export default {
  name: "Register",
  components: { Button, Form, Validation },
  computed: {
    ...mapFields("auth", ["new_user"]),
    ...mapState('auth', ['success']),

    error() { return this.success === false }
  },
  methods: {
    /*Register() {
      this.$store.commit("auth/userRegister");
    },*/
  ...mapActions('auth', ['register']),
   },
 
   watch:
   { success(p_new)
     {  if (p_new === true)
        { router.push('/') }
     }
   },
};
</script>
<style lang="scss"></style>

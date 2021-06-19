<template>
  <body>
    <router-link to="/login">
      <Button label="go back" btn_class="medium" />
    </router-link>
    <RegisterForm />
  </body>
</template>

<script>
import Button from "../components/Button.vue";
import RegisterForm from "../components/authenticate/RegisterForm.vue";
export default {
  name: "Register",
  components: { Button, RegisterForm },
};
</script>
<style lang="scss"></style>

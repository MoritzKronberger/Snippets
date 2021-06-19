<template>
  <body>
    <router-link to="/">
      <Button label="Visit Feed" btn_class="medium" />
    </router-link>
    <LoginForm />
  </body>
</template>

<script>
import Button from "../components/Button.vue";
import LoginForm from "../components/authenticate/LoginForm.vue";
export default {
  name: "Login",
  components: { Button, LoginForm },
};
</script>
<style lang="scss"></style>

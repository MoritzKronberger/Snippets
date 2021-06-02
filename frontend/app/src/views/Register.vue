<template>
  <router-link to="/login"></router-link>
  <RegisterForm />
</template>

<script>
import Button from "../components/Button.vue";
import RegisterForm from "../components/authenticate/register/RegisterForm.vue";
export default {
  name: "Register",
  components: { Button, RegisterForm },
};
</script>
<style lang="scss">
</style>

<template>
    <router-link to="/">
        <Button label="Visit Feed" btn_class="medium" />
    </router-link>
  <LoginForm />
</template>

<script>
import Button from "../components/Button.vue";
import LoginForm from "../components/authenticate/login/LoginForm.vue";
export default {
  name: "Login",
  components: { Button, LoginForm },
};
</script>
<style lang="scss">

</style>

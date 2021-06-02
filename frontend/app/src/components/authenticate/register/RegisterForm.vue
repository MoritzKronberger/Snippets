<template>
  <router-link to="/login">
    <Button label="go back" btn_class="medium" />
  </router-link>
  <h1>Create Account</h1>
  <section class="content">
    <label for="username">Username:</label>
    <input class="input" v-model="new_comment" type="text" />
    <label for="password">Password:</label>
    <input class="input" v-model="new_comment" type="text" />
    <label for="password">Confirm Password:</label>
    <input class="input" v-model="new_comment" type="text" />
    <Button label="Register" btn_class="medium" />
  </section>
</template>

<script>
import Button from "../../Button.vue";
export default {
  name: "Register",
  components: { Button },
};
</script>
<style lang="scss">
</style>

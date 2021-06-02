<template>
  <router-link to="/">Feed</router-link>
  <section class="login">
    <h1 class="login header">Login</h1>
    <label for="username">Username:</label>
    <input class="input" v-model="new_comment" type="text" />
    <label for="password">Password:</label>
    <input class="input" v-model="new_comment" type="text" />
    <Button label="Login" btn_class="medium" />
  </section>
</template>

<script>
import Button from "../../Button.vue";
export default {
  name: "LoginForm",
  components: { Button },
};
</script>

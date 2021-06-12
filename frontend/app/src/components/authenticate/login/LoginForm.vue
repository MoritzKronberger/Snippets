<template>
  <h1>Login</h1>
  <section class="content auth">
    <label for="username">Username:</label>
    <input class="input" v-model="new_comment" type="text" />
    <label for="password">Password:</label>
    <input class="input" v-model="new_comment" type="text" />
    <Button label="Login" btn_class="medium" />
    <div class="acc">
      <p>No Account?</p>
      <router-link to="/register">
        <Button label="Register here" btn_class="medium" />
      </router-link>
    </div>
  </section>
</template>

<script>
import Button from "../../Button.vue";
export default {
  name: "LoginForm",
  components: { Button },
};
</script>
<style lang="scss">
.acc {
  margin-top: 10%;
}
</style>
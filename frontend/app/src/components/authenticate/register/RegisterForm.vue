<template>
  <router-link to="/login">
    <Button label="go back" btn_class="medium" />
  </router-link>
  <section class="login">
    <h1 class="login header">Create Account:</h1>
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
.register {
  &.header {
    text-align: center;
  }
  width: 50%;
  margin: auto auto;
}
</style>

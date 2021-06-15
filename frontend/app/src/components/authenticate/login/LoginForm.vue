<template>
  <body>
    <h1>Login</h1>
    <div class="content auth">
      <input
        class="input"
        v-model="new_comment"
        type="text"
        placeholder="Username"
      />
      <input
        class="input"
        v-model="new_comment"
        type="text"
        placeholder="Password"
      />
      <Button label="Login" btn_class="medium" />
      <div class="acc">
        <p>No Account?</p>
        <router-link to="/register">
          <Button label="Register here" btn_class="medium" />
        </router-link>
      </div>
    </div>
  </body>
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

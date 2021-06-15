<template>
  <body>
    <h1>Create Account</h1>
    <div class="content auth">
      <input class="input" v-model="new_comment" type="text" placeholder="Username"/>
      <input class="input" v-model="new_comment" type="text" placeholder="E-Mail"/>
      <input class="input" v-model="new_comment" type="text" placeholder="Password"/>
      <label for="password">Confirm Password:</label>
      <input class="input" v-model="new_comment" type="text" placeholder="Password"/>
      <Button label="Register" btn_class="medium" />
    </div>
  </body>
</template>
<script>
import Button from "../../Button.vue";
export default {
  name: "Register",
  components: { Button },
};
</script>
<style lang="scss"></style>

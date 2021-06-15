<template>
  <body>
    <div class="content auth">

      <div v-if="auth_type.includes('email')">
        <input
          class="input"
          v-model="new_comment"
          type="text"
          placeholder="E-Mail"
        />
      </div>

      <div v-if="auth_type.includes('username_password')">
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
      </div>

      <div v-if="auth_type.includes('confirm_password')">
        <label for="password">Confirm Password:</label>
        <input
          class="input"
          v-model="new_comment"
          type="text"
          placeholder="Password"
        />
      </div>

      <Button :label="button_name" btn_class="medium" />
    </div>
  </body>
</template>
<script>
import Button from "../Button.vue";
export default {
  name: "Form",
  components: { Button },
  props: { button_name: String, auth_type: String },
};
</script>
<style lang="scss"></style>

<template>
  <body>
    <div>
      <div v-if="auth_type.includes('username_password')">
        <input
          class="input"
          v-model="user.username"
          type="text"
          placeholder="Username"
        />
        <input
          class="input"
          v-model="user.password"
          type="text"
          placeholder="Password"
        />
      </div>
      <div v-if="auth_type.includes('confirm_password')">
        <input
          class="input"
          v-model="user.password_confirm"
          type="text"
          placeholder="Confirm Password"
        />
      </div>
    </div>
  </body>
</template>
<script>
import { mapFields } from "vuex-map-fields";
export default {
  name: "Form",
  props: { auth_type: String },
    computed: {
    ...mapFields("auth", ["user"]),
  },
};
</script>
<style lang="scss"></style>

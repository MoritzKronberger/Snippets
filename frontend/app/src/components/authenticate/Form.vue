<template>
  <body>
    <div>
      <div v-if="auth_type.includes('username_password')">
        <input
          class="input"
          v-model="auth.username"
          type="text"
          placeholder="Username"
        />
        <input
          class="input"
          v-model="auth.password"
          type="text"
          placeholder="Password"
        />
      </div>
      <div v-if="auth_type.includes('confirm_password')">
        <input
          class="input"
          v-model="auth.password_confirm"
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
  props: { auth_type: String, auth: Object },
    computed: {
    ...mapFields("auth", ["user"]),
  },
};
</script>
<style lang="scss"></style>

<template>
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
          type="password"
          placeholder="Password"
        />
      </div>
      <div v-if="auth_type.includes('confirm_password')">
        <input
          class="input"
          v-model="auth.password_confirm"
          type="password"
          placeholder="Confirm Password"
        />
      </div>
    </div>
</template>
<script>
export default {
  name: "Form",
  props: { auth_type: String, auth: Object },
};
</script>
<style lang="scss"></style>

<template>
  <body>
    <div class="content auth">
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
        <label for="password">Confirm Password:</label>
        <input
          class="input"
          v-model="user.password_confirm"
          type="text"
          placeholder="Password"
        />
      </div>

      <Button :label="button_name" btn_class="medium" @click="_click" />
    </div>
  </body>
</template>
<script>
import Button from "../Button.vue";
import { mapFields } from "vuex-map-fields";
export default {
  name: "Form",
  components: { Button },
  props: { button_name: String, auth_type: String },
  computed: {
  ...mapFields("auth", ["user"]),
  },
  methods: {

  _click() {
      this.$emit("click");
    },
  },
  emits: ["click"],

};
</script>
<style lang="scss"></style>

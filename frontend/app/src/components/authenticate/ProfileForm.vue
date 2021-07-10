<template>
  <div>
    <h1>Profile for {{ user.username }}</h1>
    <div class="content auth">
      <p>current name: {{ user.username }}</p>
      <Form
        button_name="Save Profile"
        auth_type="username_password confirm_password"
        :auth="new_user"
      />
      <Validation
        :object="new_user"
        button_name="Confirm"
        @click="update"
        btn_class="medium"
        type="Register"
      />
    </div>
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from "vuex";
import router from "/router";
import Form from "./Form.vue";
import Button from "../Button.vue";
import Validation from "../validation/Form.vue";

export default {
  name: "Profile",
  components: {
    Button,
    Form,
    Validation,
  },
  computed: {
    ...mapFields("auth", ["user", "new_user"]),
    ...mapState("auth", ["success"]),
  },
  methods: {
    update() {
      this.$store.dispatch("auth/patchProfile").then(() => {
        this.$store.dispatch("auth/getProfile");
      });
    },
  },
  watch: {
    success(p_new) {
      if (p_new === true) {
        router.push("/");
      }
    },
  },
};
</script>
<style lang="scss"></style>

<template>
  <div>
    <h1>Profile</h1>
    <div class="content auth">
      <Form button_name="Save Profile" auth_type="username_password" :auth="user"/> 
      <Validation :object="user" button_name="Save Profile" @click="Save" btn_class="medium"/>
    </div>
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import Form from "./Form.vue"
import Button from "../Button.vue";
import Validation from "../validation/Form.vue"
export default {
  name: "Profile",
  components: {
    Button, Form, Validation
  },
    computed: {
    ...mapFields("auth", ["user"]),
  },
  methods: {
       Save() {
      this.$store.commit("auth/userProfile");
    },
  }
};
</script>
<style lang="scss"></style>

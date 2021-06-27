<template>
  <div>
    <h1>Profile</h1>
    <div class="content auth">
      <Form button_name="Save Profile" auth_type="username_password" :auth="user"/> 
      <Validation :object="user" button_name="Save Profile" @click= "patchProfile" btn_class="medium"/>
    </div>
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import { mapActions, mapState } from 'vuex';
import router  from '/router';
import Form from "./Form.vue";
import Button from "../Button.vue";
import Validation from "../validation/Form.vue";

export default {
  name: "Profile",
  components: {
    Button, Form, Validation
  },
  computed: {
    ...mapFields("auth", ["user"]),
    ...mapState('auth', ['success']),
  },
  methods: {
    /*Save() {
      this.$store.commit("auth/userProfile");
    },*/
    ...mapActions('auth', ['patchProfile']),
  },
  watch: { success(p_new)
     {  if (p_new === true)
        { router.push('/') }
     }
   },
};
</script>
<style lang="scss"></style>

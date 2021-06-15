<template>
  <body>
    <router-link to="/">
      <Button label="Feed" btn_class="medium" />
    </router-link>
    <Account />
  </body>
</template>
<script>
import Button from "../components/Button.vue";
import Account from "../components/authenticate/account/AccountForm.vue";
export default {
  name: "Feed",
  components: {
    Button,
    Account,
  },
};
</script>
<style lang="scss"></style>

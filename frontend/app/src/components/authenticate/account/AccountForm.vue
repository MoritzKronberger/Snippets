<template>
  <body>
    <h1>Profile</h1>
    <div class="content auth">
      <input
        class="input"
        v-model="new_comment"
        type="text"
        placeholder="New Username"
      />
      <input
        class="input"
        v-model="new_comment"
        type="text"
        placeholder="New Email"
      />
      <input
        class="input"
        v-model="new_comment"
        type="text"
        placeholder="New Password"
      />
      <Button label="Save Profile" btn_class="medium" />
    </div>
  </body>
</template>
<script>
import Button from "../../Button.vue";
export default {
  name: "Account",
  components: {
    Button,
  },
};
</script>
<style lang="scss"></style>

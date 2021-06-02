<template>
  <router-link to="/login"></router-link>
  <RegisterForm />
</template>

<script>
import Button from "../components/Button.vue";
import RegisterForm from "../components/authenticate/register/RegisterForm.vue";
export default {
  name: "Register",
  components: { Button, RegisterForm },
};
</script>
<style lang="scss">
.hidden {
  display: none;
}

html,
body {
  height: 100%;
  font-size: $font-size-base !important;
  font-family: $font-family-sans;
  background-color: white;
}

.button {
  background-color: #a0dee2;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 10px;

  &.addButton {
    font-size: 25px;
    margin-left: 50%;
    margin-bottom: 2.5%;
  }

  &.medium {
    font-size: 20px;
  }

  &.small {
    font-size: 15px;
    margin-right: 2%;
    &.discard {
      background-color: orange;
      float: right;
    }
  }
}

.input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 15px;
}
</style>

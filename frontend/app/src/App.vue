<template>
<router-link to="/login"></router-link>
 <router-view/>
</template>

<script>
export default {
  name: "App",
}
</script>
<style lang="scss">
.hidden {
  display: none;
}

h1 {
  text-align: center;
}

html,
body {
  height: 100%;
  font-size: $font-size-base !important;
  font-family: $font-family-sans;
  background-color: white;
}

.content {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2.5%;
  /*&.comment {
    margin-left: 0%;
    width: 100%;
    font-size: medium;
  }*/
  &.post {
    padding: 2%;
    border: 2px solid gray;
    border-radius: 10px;
    font-size: medium;
    &.form {
  padding: 2%;
  border: 2px solid #a0dee2;
  border-radius: 10px;
  margin-bottom: 10%;
  font-size: small;
}
  }
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
  &.code {
    height: 300px;
  }
}
</style>
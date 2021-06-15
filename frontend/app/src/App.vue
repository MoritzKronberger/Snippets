<template>
  <body>
    <router-link to="/login"></router-link>
    <router-view />
    <footer>© Lea Jell, Martin Kohnle, Moritz Kronberger</footer>
  </body>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
.hidden {
  display: none;
}

.center {
  text-align: center;
}

footer {
  margin-top: 5%;
  font-size: 10px;
  text-align: center;
}

h1 {
  text-align: center;
}
s html,
body {
  height: 100%;
  font-size: $font-size-base !important;
  font-family: $font-family-sans;
  background-color: white;
}

.flex-container {
  display: flex;
  flex-direction: row;
}

.content {
  &.auth {
    width: 50%;
    margin: 0 auto;
  }
  &.post {
    padding: 2%;
    border: 2px solid rgb(224, 224, 224);
    border-radius: 10px;
    font-size: medium;
  }
  &.form {
    width: 50%;
    margin: 0 auto;
    padding: 2%;
    border: 2px solid #a0dee2;
    border-radius: 10px;
    font-size: small;
  }
}

.button {
  background-color: #a0dee2;
  border: none;
  color: white;
  padding: 5px 10px;
  margin-right: 2%;
  cursor: pointer;
  border-radius: 10px;
  &.addButton {
    font-size: 25px;
    width: 20%;
  }
  &.medium {
    font-size: 20px;
  }

  &.small {
    font-size: 14px;
    &.discard {
      background-color: orange;
      float: right;
    }
  }
}

.input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 15px;
  &.code {
    height: 300px;
  }
}
</style>

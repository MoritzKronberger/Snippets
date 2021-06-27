<template>
  <div>
    <div class="profile">
      <router-link to="/profile">
        <Button label="Profile" btn_class="medium" />
      </router-link>
    </div>
    <router-link to="/login">
      <Button label="Login" btn_class="medium" />
    </router-link>
    <router-view />
    <h1>Coding Feed</h1>
    <Search />
    <Form />
    <Posts />
  </div>
</template>

<script>
import Form from "../components/feed/form/Form.vue";
import Search from "../components/feed/search/Search.vue";
import Posts from "../components/feed/post/Posts.vue";
import Button from "../components/Button.vue";
export default {
  name: "Feed",
  components: {
    Form,
    Posts,
    Search,
    Button,
  },
  beforeMount: function() {
    this.$store.dispatch("post/getLanguages", null, {root: true});
    this.$store.dispatch("post/getPosts", null, {root: true});
  }
};
</script>
<style lang="scss">
.profile {
  float: right;
}
</style>

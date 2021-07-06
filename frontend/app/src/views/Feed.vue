<template>
  <div>
    <div v-if="isAuthorized">
      <div class="profile">
        <router-link to="/profile">
          <Button :label="user.username" btn_class="medium" />
        </router-link>
      </div>
      <Button label="Logout" btn_class="medium" @click="logout" />
    </div>
    <router-link to="/login">
      <div v-if="isAuthorized == false">
        <Button label="Login" btn_class="medium" />
      </div>
    </router-link>
    <router-view />
    <h1>Coding Feed</h1>
    <Search />
    <Form />
    <Posts />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
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
  computed: {
    ...mapState("auth", ["token", "user"]),
    ...mapGetters(["isAuthorized"]),
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },

  beforeMount: function() {
    //TODO: reactivate after login works
    return this.$store
      .dispatch("post/getLanguages", null, { root: true })
      .then(() => {
        return this.$store
          .dispatch("post/getSortings", null, { root: true })
          .then(() => {
            return this.$store
              .dispatch("post/getPosts", null, { root: true })
              .then(() => {
                return this.$store
                  .dispatch("post/getComments", null, { root: true })
                  .then(() => {
                    return this.$store.dispatch("post/getLikes", null, {
                      root: true,
                    });
                  });
              });
          });
      });
  },
};
</script>
<style lang="scss">
.profile {
  float: right;
}
</style>

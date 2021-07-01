import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";
import Feed from "../views/Feed.vue";
const 
  ifNotAuthorized = (to, from, next) => {
    if (store.getters["auth/isNotAuthorized"]) {
      next(), console.log("notAuth");
    } else {
      next("/");
    }
  },
  ifAuthorized = (to, from, next) => {
    if (store.getters["auth/isAuthorized"]) {
      next(), console.log("isAuth");
    } else {
      next("/login");
    }
  },
  routes = [
    {
      path: "/",
      name: "feed",
      component: Feed,
    },
    {
      beforeEnter: ifNotAuthorized,
      path: "/login",
      name: "Login",
      component: function() {
        return import("../views/Login.vue");
      },
    },
    {
      beforeEnter: ifNotAuthorized,
      path: "/register",
      name: "Register",
      component: function() {
        return import("../views/Register.vue");
      },
    },
    {
      beforeEnter: ifAuthorized,
      path: "/profile",
      name: "Profile",
      component: function() {
        return import("../views/Profile.vue");
      },
    },
  ];

const 
  router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  router.beforeEach((to, from, next) => {
    store.state.auth.success = null;
    next();
  });

export default router;

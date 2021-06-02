import { createRouter, createWebHashHistory } from "vue-router";
import Feed from "../views/Feed.vue";
const routes = [
  {
    path: "/",
    name: "feed",
    component: Feed,
  },
  {
    path: "/login",
    name: "Login",
    component: function() {
      return import("../views/Login.vue");
    },
  },
  {
    path: "/register",
    name: "Register",
    component: function() {
      return import("../views/Register.vue");
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

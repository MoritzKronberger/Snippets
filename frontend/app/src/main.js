import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VuePrism from "vue-prism";
createApp(App)
  .use(store)
  .use(VuePrism)
  .use(router)
  .mount("#app")

import { createStore } from "vuex";
import post from "./modules/post";
import form from "./modules/form";
import auth from "./modules/auth";
export default createStore({
  modules: { post, form, auth },
});

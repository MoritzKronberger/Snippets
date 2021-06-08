import { createStore } from "vuex";
import post from "./modules/post";
import form from "./modules/form";
export default createStore({
  modules: { post, form },
});

/* template form https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_vue_01/-/tree/debug */

import { createStore } from "vuex";
import { getField, updateField } from "vuex-map-fields";
import post from "./modules/post";
import form from "./modules/form";
import auth from "./modules/auth";
import { postJson } from "/js/service/rest";
import { paths } from "/json/config.json";
import jwt_decode from "jwt-decode";

const defaultSession = () => {
  return {
    token: null,
    id: null,
  };
};

export default createStore({
  modules: { post, form, auth },

  state: defaultSession(),

  getters: {
    getField,

    isNotAuthorized: (state) => !state.token,
    isAuthorized: (state) => !!state.token,
  },

  mutations: {
    updateField,

    reset(state) {
      console.log("reset");
      Object.assign(state, defaultSession());
      this.commit("auth/resetUser");
    },

    saveSessionInfo(state, res) {
      const c_token = state.token;
      state.token = res.token;
      if (c_token != null && state.token == null) {
        this.commit("reset");
      } // auto logout if no new token had be passed to the client
    },

    getToken(state) {
      console.log("token:", state.token);
    },
  },

  actions: {
    async register({ state, commit, dispatch }) {
      const res = await postJson(null, paths.register, state.auth.new_user);
      commit("saveSessionInfo", res);

      if (res.status === 201) {
        await dispatch("login");
      }
      return res.status < 300;
    },

    async login({ state, dispatch, commit }) {
      const user = state.auth.user;
      let data = {
        username: user.username ? user.username.trim() : null,
        password: user.password ? user.password.trim() : "",
      };
      const res = await postJson(state.token, paths.login, data);
      console.log("res", res);

      if (res.status === 200) {
        const token = res.headers.authorization.substring(7), // remove "Bearer "
          payload = jwt_decode(token);
        console.log("token here:", token);
        state.token = token;
        state.id = payload.id;
        user.password = null;

        await dispatch("auth/getProfile");

        //TODO: delete and reactivate in feed
        await dispatch("post/getLanguages").then(() => {
          dispatch("post/getPosts").then(() => {
            dispatch("post/getComments").then(() => {
              dispatch("post/getLikes");
            });
          });
        });
      } else {
        commit("reset");
      }

      console.log("state:", state);
      let isNotAuthorized = !state.token;
      let isAuthorized = !!state.token;
      console.log("isNotAuthorized", isNotAuthorized);
      console.log("isAuthorized", isAuthorized);
      return res.status;
    },

    logout({ state, commit }) {
      commit("reset");
      return true;
    },
  },
});

/* template form https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_vue_01/-/tree/debug */

import { createStore } from "vuex";
import { getField, updateField } from 'vuex-map-fields';
import post from "./modules/post";
import form from "./modules/form";
import auth from "./modules/auth";
import { postJson } from "/js/service/rest";
import { paths } from '/json/config.json';
import jwt_decode from 'jwt-decode';

const defaultSession = () => {
  return {
    token: null,
    id: null
  }
}

export default createStore({
  modules: { post, form, auth },

  state: defaultSession(),

  getters: {
    getField,

    isNotAuthorized: state => !state.token,
    isAuthorized:    state => !!state.token,
  },

  mutations: {
    updateField, 
  
    reset(state) {
      console.log("reset");
      Object.assign(state, defaultSession());
      this.commit('auth/resetUser');
    },

    saveSessionInfo(state, res) {
      const c_token = state.token;
      console.log("c_token", c_token);
      state.token     = res.token;
      console.log("res.token", res.token);
     /* because of a problem sending the tokens between frontend and backend, this is not working as it should.
     // auto logout if no new token was passed to the client    
     if (c_token != null && state.token == null) {
         this.commit('reset')
      } */  
    },
  },

  actions: {
    async register({ state, commit, dispatch }) {
      //after the postJson state.auth.new_user is emtpy
      state.auth.user.username = state.auth.new_user.username;
      state.auth.user.password = state.auth.new_user.password;
      const res = await postJson(null, paths.register, state.auth.new_user);
      commit('saveSessionInfo', res);

      if (res.status === 201) {
        await dispatch("login");
      } else {
        //dont save false data
        state.auth.user.username = null;
        state.auth.user.password = null;
      }
      return res.status < 300;
    },

    async login({ state, dispatch, commit }) {
      const user = state.auth.user;
      let data = {
        username: user.username ? user.username.trim() : null,
        password: user.password ? user.password.trim() : "",
      };
      console.log("data", data);
      const res = await postJson(state.token, paths.login, data);
      console.log("res", res);

      if (res.status === 200) {
        const token = res.headers.authorization.substring(7), // remove "Bearer "
          payload = jwt_decode(token);
          state.token = token;
          state.id = payload.id;
          user.password = null; //delete password!

          await dispatch("auth/getProfile");
      } else {
        commit('reset');
      }
      return res.status;
    },

    logout({ state, commit }) {
      commit('reset');
      return true;
    },

    async reloadPostData({state, dispatch }) {
      return dispatch("post/getPosts").then(() => {
          return dispatch("post/getComments").then(() => {
              return dispatch("post/getLikes");
          });
      });
    }
  }
});

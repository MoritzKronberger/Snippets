/* template from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_vue_01 */

import { getField, updateField } from "vuex-map-fields";
import { paths } from "/json/config.json";
import {
  postJson,
  getJson,
  patchJson,
  putJson,
  deleteJson,
} from "/js/service/rest";
import jwt_decode from "jwt-decode";

const account_empty = () => {
    return {
      username: null,
      password: null,
    };
  },
  state_default = () => {
    return {
      //user
      username: null,
      password: null,

      //new_user
      username: null,
      password: null,
      password_confirm: null,

      // session info
      token: null,
      id: null,
      isAdmin: false,
      success: null, // value is null when CUD command starts, and true/false after login has been finished
      constraint: constraints[null],
    };
  },
  save_action_info = (state, res) => {
    state.token = res.token;
    state.success = res.status < 300;
    //TODO: add constraints here ?
    //state.constraint = constraints[res.data.constraint || null];
  };

export default {
  namespaced: true,
  state: state_default(),

  getters: {
    getField,

    isNotAuthorized: (state) => !state.token,
    isAuthorized: (state) => !!state.token,
  },

  mutations: {
    updateField,

    userRegister(state) {
      console.log(state.new_user.username);
      console.log(state.new_user.password);
      console.log(state.new_user.password_confirm);
    },

    userLogin(state) {
      console.log(state.user.username);
      console.log(state.user.password);
    },
    userProfile(state) {
      console.log(state.user.username);
      console.log(state.user.password);
    },

    resetAccount(state) {
      state.account = account_empty();
    },
  },
  actions: {
    async register({ state, dispatch }) {
      const res = await postJson(state.token, paths.register, {
        username: state.username ? state.username.trim() : null,
        password: state.password ? state.password.trim() : null,
        /*// Optional chaining works with webpack 5, 
               // supported by @vue/cli@5.0.0-beta.1 
              name: state.name?.trim(),
             */
      });

      //TODO: add constraints here ?
      //state.constraint = constraints[res.data.constraint || null];
      if (res.status === 201) {
        dispatch("login");
      }
    },

    async login({ state, dispatch }) {
      const res = await postJson(state.token, paths.login, {
        user: state.username ? state.username.trim() : null,
        password: state.password ? state.password.trim() : "",
      });

      if (res.status === 200) {
        const token = res.headers.authorization.substring(7), // remove "Bearer "
          payload = jwt_decode(token);
        state.token = token;
        state.id = payload.id;
        state.password = null; // Don't store the password.
        dispatch("getProfile");
      } else {
        Object.assign(state, state_default());
      }

      state.success = res.status === 200 ? true : null;
    },

    logout({ state }) {
      Object.assign(state, state_default());
      state.success = true;
    },

    async getProfile({ state }) {
      const res = await getJson(state.token, `${paths.accounts}/${state.id}`);
      save_action_info(state, res);
      if (res.status === 200) {
        const data = res.data;
        state.user = data.username;
      }
    },

    async patchProfile({ state }) {
      const res = await patchJson(
        state.token,
        `${paths.accounts}/${state.id}`,
        {
          username: state.username ? state.username.trim() : null,
          password: state.password ? state.password.trim() : null,
        }
      );
      save_action_info(state, res);
    },

    async deleteProfile({ state, dispatch }) {
      const res = await deleteJson(
        state.token,
        `${paths.accounts}/${state.id}`
      );
      save_action_info(state, res);

      if (res.status !== 200) {
        dispatch("logout");
      }
    },

    async getAccounts({ state }) {
      const res = await getJson(state.token, `${paths.accounts}`);
      save_action_info(state, res);
      state.accounts = res.status === 200 ? res.data : [];
    },

    async newAccount({ state }) {
      const res = await postJson(
        state.token,
        `${paths.accounts}`,
        state.account
      );
      save_action_info(state, res);
    },

    async putAccount({ state }, id) {
      const res = await putJson(
        state.token,
        `${paths.accounts}/${id}`,
        state.account
      );
      save_action_info(state, res);
    },

    async deleteAccount({ state }, id) {
      const res = await deleteJson(
        state.token,
        `${paths.accounts}/${id}`,
        state.account
      );
      save_action_info(state, res);
    },
  },

  /*modules: 
  {
  }*/
};

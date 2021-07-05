/* template from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_vue_01 */

import { getField, updateField } from "vuex-map-fields";
import { paths } from "/json/config.json";
import { postJson, getJson, patchJson, deleteJson } from "/js/service/rest";
import jwt_decode from "jwt-decode";

const user_empty = () => {
    return {
      username: null,
      password: null,
    };
  },
  state_default = () => {
    return {
      user: user_empty(),
      new_user: { username: null, password: null, password_confirm: null },
      users: [],
      report: null,
    };
  };

export default {
  namespaced: true,

  state: state_default(),

  getters: {
    getField,
  },

  mutations: {
    updateField,

    resetUser(state) {
      Object.assign(state.user, user_empty());
    },
  },
  actions: {
    //Remember: rootState has all states in it, state is this state!
    async getProfile({ rootState, state, commit }) {
      const res = await getJson(
        rootState.token,
        `${paths.accounts}/${rootState.id}`
      );
      commit("saveSessionInfo", res, { root: true });
      if (res.status === 200) {
        console.log("getProfile data:", res.data);
        Object.assign(state.user, res.data);
      }
      return res.status < 300;
    },

    async patchProfile({ rootState, state, commit }) {
      console.log("state", state);
      const data = {
        username: state.new_user.username ? state.new_user.username.trim() : null,
        password: state.new_user.password ? state.new_user.password.trim() : null,
      };
      const res = await patchJson(
        rootState.token,
        `${paths.accounts}/${rootState.id}`,
        data
      );
      state.report = "successfully changed profile"
      commit("saveSessionInfo", res, { root: true });
      return res.status < 300;
    },

    async deleteProfile({ rootState, state, commit, dispatch }) {
      const res = await deleteJson(
        rootState.token,
        `${paths.accounts}/${rootState.id}`
      );
      commit("saveSessionInfo", res, { root: true });
      if (res.status === 200) {
        dispatch("logout");
      } else {
        return res.status < 300;
      }
    },

    async getUsers({ rootState, state, commit }) {
      const res = await getJson(rootState.token, `${paths.accounts}`);
      commit("saveSessionInfo", res, { root: true });
      state.users = res.status === 200 ? res.data : [];
      return res.status < 300;
    },
  },

  /* modules: 
  {
  }*/
};

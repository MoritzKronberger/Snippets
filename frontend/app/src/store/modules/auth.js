/* template from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_vue_01 */

import { getField, updateField } from "vuex-map-fields";
import { paths } from "/json/config.json";
import {
  postJson,
  getJson,
  patchJson,
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
      user: { username: null, password: null },
      new_user: { username: null, password: null, password_confirm: null },


      account:      account_empty(),
      accounts:     [],
    };
  };

export default {
  namespaced: true,

  state: state_default(),

  getters: {
    getField
  },

  mutations: {
    updateField,

    resetAccount(state) {
      Object.assign(state, account_empty());
    },
  },
  actions: {
    async getProfile({ rootState, state, commit }) {
      const res = await getJson(rootState.token, `${paths.accounts}/${rootState.id}`);
      commit('saveSessionInfo', res, { root: true });
      if (res.status === 200) {
        console.log("getProfile data:", res.data);
        Object.assign(state.account, res.data);
        console.log("account:", state.account);
      }
      return res.status < 300;
    },

    async patchProfile({ rootState, state, commit }) {
      const data = {
        username: state.user.username ? state.user.username.trim() : null,
        password: state.user.password ? state.user.password.trim() : null,
      };
      const res = await patchJson(rootState.token, `${paths.accounts}/${rootState.id}`, data
      );
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async deleteProfile({ rootState, state, commit, dispatch }) {
      const res = await deleteJson(rootState.token, `${paths.accounts}/${rootState.id}`);
      commit('saveSessionInfo', res, { root: true });
      if (res.status === 200) {
        dispatch('logout');
      } else {
        return res.status < 300;
      }
    },

    async getAccounts({  rootState, state, commit }) {
      const res = await getJson(rootState.token, `${paths.accounts}`);
      commit('saveSessionInfo', res, { root: true });
      state.accounts = (res.status === 200) ? res.data : [];
      return res.status < 300;
    },
  },

  /* modules: 
  {
  }*/
};

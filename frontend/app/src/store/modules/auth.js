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
        console.log("data:", res.data);
        Object.assign(state, res.data);
      }
      return res.status < 300;
    },

    async patchProfile({ state }) {
      const res = await patchJson(
        state.token,
        `${paths.accounts}/${state.id}`,
        {
          username: state.user.username ? state.user.username.trim() : null,
          password: state.user.password ? state.user.password.trim() : null,
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

    async deleteAccount({ state }, id) {
      const res = await deleteJson(
        state.token,
        `${paths.accounts}/${id}`,
        state.account
      );
      save_action_info(state, res);
    },
  },

  /* modules: 
  {
  }*/
};

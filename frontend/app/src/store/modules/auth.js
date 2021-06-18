import { getField, updateField } from "vuex-map-fields";
export default {
  namespaced: true,
  state: {
    user: [{ username: null }, { password: null }, { password_confirm: null }],
  },

  getters: {
    getField,
  },

  mutations: {
    updateField,

    userRegister(state) {
        console.log(state.user.username)
        console.log(state.user.password)
        console.log(state.user.password_confirm)
    },

    userLogin(state) {
        console.log(state.user.username)
        console.log(state.user.password)
    }

  },
  /* actions: 
  {
  },
  modules: 
  {
  }*/
};

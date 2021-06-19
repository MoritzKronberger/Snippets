import { getField, updateField } from "vuex-map-fields";
export default {
  namespaced: true,
  state: {
    user: { username: null, password: null },
    new_user: { username: null, password: null , password_confirm: null },
  },

  getters: {
    getField,
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
  },
  /* actions: 
  {
  },
  modules: 
  {
  }*/
};

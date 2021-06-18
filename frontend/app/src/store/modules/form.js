import { getField, updateField } from "vuex-map-fields";
export default {
  namespaced: true,
  state: {
    section: false,
    errors: [],
  },




  getters: {
    getField,
    vis_Add: (state) => (section) =>
      state.section !== section ? "hidden" : "center",
    vis_Form: (state) => (section) =>
      state.section !== section ? "hidden" : "content form",
  },

  mutations: {
    updateField,
    setActive(state) {
      state.section = !state.section;
    },
  },

    validator(state)
    {
      state.errors = [];
      for (const [key, value] of Object.entries(state.post)) {
        if (value === "") {
          state.errors.push(key);
        }
      }
    }

};

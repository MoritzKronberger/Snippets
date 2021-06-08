import { getField, updateField } from "vuex-map-fields";
export default {
  namespaced: true,
  state: {
    section: false,
    active_id: 0,
  },

  getters: {
    getField,
    vis_Add: (state) => (section) =>
      state.section !== section ? "hidden" : "header",
    vis_Form: (state) => (section) =>
      state.section !== section ? "hidden" : "content form",
  },

  mutations: {
    updateField,
    setActive(state) {
      state.section = !state.section;
    },
  },
};

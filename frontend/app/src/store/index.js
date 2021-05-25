import { createStore } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
export default createStore({
  state: 
  { section: false,
  },

  getters:
  { getField,
    vis_FormPost:
    state => section => state.section !== section ? 'hidden' : 'content form',
  },
  
  mutations: 
  { updateField,
  },
  actions: 
  {
  },
  modules: 
  {
  }
})

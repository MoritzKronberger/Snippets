import { createStore } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
export default createStore({
  state: 
  { section: false,
    id: 0,
    post: 
    [{  lang_id: "",
        title: "",
        content: "",
        category: "",
        comment: "",
    }],
    posts:[]
  },

  getters:
  { getField,
    vis_FormPost:
    state => section => state.section !== section ? 'hidden' : 'content form',
  },
  
  mutations: 
  { updateField,
    newPost(state)
    { 
      state.posts.push
      ({ id:        state.id +=1,
         lang_id:   "",
         title:     state.post.title,
         content:   state.post.content,
         category:  state.post.category,
         comment: [{ message: state.post.comment }]
      })
      console.log(state.posts);
    }
  },
  actions: 
  {
  },
  modules: 
  {
  }
})

import { createStore } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
export default createStore({
  state: 
  { section: false,

    post: 
    {   id: 0,
        lang_id: "",
        title: "",
        content: "",
        category: "",
        comment: "",
    },
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
    { state.posts.push
      ({ id:        state.post.id,
         lang_id:   "",
         title:     state.post.title,
         content:   state.post.content,
         category:  state.post.category,
         comment: [{ message: state.post.comment }]
      })
      state.section = false;
      state.post.id += 1
    },

    addComment(state, post_id)
    { state.posts[post_id].comment
      .push({message: state.post.comment})
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

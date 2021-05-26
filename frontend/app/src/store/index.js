import { createStore } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
export default createStore({
  state: 
  { section: false,
    active_id: 0,
    post: 
    {   id:       0,
        lang_id:  "",
        title:    "",
        content:  "",
        category: "",
    },
    comment:
    { new_comment: "",
      author:      "",
      date:        "",
      likes:       0,
    },
    posts:[],

    lang_object:
    [ {id:0, name:"Java"},
      {id:1, name:"Python"},
      {id:2, name:"C#"} ]
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
         lang_id:   state.post.lang_id,
         title:     state.post.title,
         content:   state.post.content,
         category:  state.post.category,
         comment:   [],
         likes:     0,
         author:    "Martin Kohnle",
         date:      "DD/MM/YYYY"
      })
      state.section = false;
      state.post.id += 1
    },

    addComment(state, post_id)
    { state.posts[post_id].comment.push(
        { message: state.comment.new_comment,
          author:  "SomeoneElse42",
          date:    "23.05.2021",
          likes:   state.comment.likes,
        })
        state.comment.new_comment = "";
        
    },

    addLike(state, post_id)
    { state.posts[post_id].likes += 1;
    }

  },
 /* actions: 
  {
  },
  modules: 
  {
  }*/
})

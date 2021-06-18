import { getField, updateField } from "vuex-map-fields";
export default {
  namespaced: true,
  state: {
    section: false,
    active_id: null,
    new_comment: "",
    post: { lang_id: "", title: "", content: "", category: "" },
    comment: { author: "", date: "", likes: 0 },
    posts: [],
    errors: [],
    lang_object: [
      { id: 0, name: "Java" },
      { id: 1, name: "Python" },
      { id: 2, name: "C#" },
      { id: 3, name: "JavaScript" },
    ],
  },

  getters: {
    getField,
  },

  mutations: {
    updateField,
    newPost(state) {
      state.errors = [];
      for (const [key, value] of Object.entries(state.post)) {
        if (value === "") {
          state.errors.push(key);
        }
      }
      if (state.errors.length == 0) {
        state.posts.push({
          id: state.posts.length,
          lang_id: state.post.lang_id,
          title: state.post.title,
          content: state.post.content,
          category: state.post.category,
          comment: [],
          likes: 0,
          author: "Martin Kohnle",
          date: "DD/MM/YYYY",
        });

        state.section = false;
        for (let prop in state.post) {
          state.post[prop] = "";
        }
      }
    },

    addComment(state, post_id) {
      state.errors = [];
      if (state.new_comment !== "") {
        state.posts[post_id].comment.push({
          id: state.posts[post_id].comment.length,
          message: state.new_comment,
          author: "SomeoneElse42",
          date: "23.05.2021",
          likes: state.comment.likes,
        });
        state.comment.new_comment = "";
      } else {
        state.errors.push("comment");
      }
    },

    addLike(state, post_id) {
      state.posts[post_id].likes += 1;
    },

    addLikeComment(state, com_id) {
      state.posts[state.active_id].comment[com_id].likes += 1;
    },
  },
  /* actions: 
  {
  },
  modules: 
  {
  }*/
};

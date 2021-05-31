import { createStore } from "vuex";
import { getField, updateField } from "vuex-map-fields";
export default createStore({
  state: {
    section: false,
    active_id: 0,
    post: { lang_id: "", title: "", content: "", category: "" },
    comment: { new_comment: "", author: "", date: "", likes: 0 },
    posts: [],
    errors: [],
    lang_object: [
      { id: 0, name: "Java" },
      { id: 1, name: "Python" },
      { id: 2, name: "C#" },
    ],
  },

  getters: {
    getField,
    vis_FormPost: (state) => (section) =>
      state.section !== section ? "hidden" : "content form",
  },

  mutations: {
    updateField,

    newPost(state) {
      let valid = true;
      /*for (let prop in state.post) {
        if (state.post[prop] === "") {
          state.errors.push(state.post.prop);
          valid = false;
        }
      }*/

      for (const [key, value] of Object.entries(state.post)) {
        if (value === "") {
          state.errors.push(key);
          valid = false;
        }
      }

      if (valid == true) {
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
  },

  addComment(state, post_id) {
    state.posts[post_id].comment.push({
      id: state.posts[post_id].comment.length,
      message: state.comment.new_comment,
      author: "SomeoneElse42",
      date: "23.05.2021",
      likes: state.comment.likes,
    });
    state.comment.new_comment = "";
  },

  addLike(state, post_id) {
    state.posts[post_id].likes += 1;
  },

  addLikeComment(state, com_id) {
    state.posts[state.active_id].comment[com_id].likes += 1;
  },
  /* actions: 
  {
  },
  modules: 
  {
  }*/
});

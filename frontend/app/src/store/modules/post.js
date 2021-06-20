import { getField, updateField } from "vuex-map-fields";
export default {
  namespaced: true,
  state: {
    section: false,
    active_id: null,
    post: { lang_id: null, title: null, content: null, category: null },
    add_comment: { comment: null },
    comment: { author: null, date: null, likes: 0 },
    posts: [],

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
    },

    addComment(state, post_id) {
      state.posts[post_id].comment.push({
        id: state.posts[post_id].comment.length,
        message: state.add_comment.comment,
        author: "SomeoneElse42",
        date: "23.05.2021",
        likes: state.comment.likes,
      });
    },

    addLike(state, post_id) {
      state.posts[post_id].likes += 1;
    },

    addLikeComment(state, com_id) {
      state.posts[state.active_id].comment[com_id].likes += 1;
    },

    deletePost(state, post_id) {
      console.log("Delete Post: " + state.posts[post_id].id);
    },
  },
  /* actions: 
  {
  },
  modules: 
  {
  }*/
};

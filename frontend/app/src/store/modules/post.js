import { getField, updateField, __esModule } from "vuex-map-fields";
import { paths } from "/json/config.json";
import {
  postJson,
  getJson,
  patchJson,
  deleteJson,
} from "/js/service/rest";
import jwt_decode from "jwt-decode";

const 
  post_empty = () => {
    return {
    id: null,
     creation_time: null,
     title: null,
     content: null,
     language: null, 
     user_id: null, 
     username: null, 
     profile_picture: null, 
     num_likes: null, 
     num_comments: null, 
     categories: null,
    }
  },

  languages = () => {
    return {
      lang_object: [
        { id: 0, name: "Java" },
        { id: 1, name: "Python" },
        { id: 2, name: "C#" },
        { id: 3, name: "JavaScript" },
      ],
    }
  },

  state_default = () => {
    return {
      section: false,
      active_id: null,

      post = post_empty(),
      posts = [],
      add_comment: { comment: null },
      comment: { 
        author: null, 
        date: null, 
        likes: 0 
      },
      posts: [],
    }
  },

  save_action_info = (state, res) => {
    state.success = res.status < 300;
    //TODO: add constraints here ?
    //state.constraint = constraints[res.data.constraint || null];
  };


export default {
  namespaced: true,
  state: state_default(),

  getters: {
    getField,

    isNotAuthorized: state => !state.token,
    isAuthorized:    state => !!state.token, // bug: Token muss gültig sein
  },

  mutations: {
    updateField,

    resetAccount(state)
    { state.account = c_account_empty() },

    /* newPost(state) {

      const arr_category = state.post.category.split(" ");

      state.posts.push({
        id: state.posts.length,
        lang_id: state.post.lang_id,
        title: state.post.title,
        content: state.post.content,
        category: arr_category,
        comment: [],
        likes: 0,
        author: "Martin Kohnle",
        date: "DD/MM/YYYY",
      });
      console.log(state.posts);
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
    }, */
  },
  actions: 
  {
    async getPost({ state, post }) {
      const res = await getJson(state.token, `${paths.posts}/${post.id}`);
      save_action_info(state, res);
      if (res.status === 200) {
        const data = res.data;
        state.post.id = data.id;
        state.post.creation_time = data.creation_time;
        state.post.title = data.title;
        state.post.content = data.content;
        state.post.language = data.language;
        state.post.user_id = data.user_id;
        state.post.username = data.username;
        state.post.profile_picture = data.profile_picture;
        state.post.num_likes = data.num_likes;
        state.post.num_comments = data.num_comments;
        state.post.categories = data.categories;
      }
    },

    async getPosts({ state }) {
      const res = await getJson(state.token, `${paths.posts}`);
      save_action_info(state,res);
      state.posts = res.status === 200 ? res.data : [];
    }

  },
  /* modules: 
  {
  }*/
};


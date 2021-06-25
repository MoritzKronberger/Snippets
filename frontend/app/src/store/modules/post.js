import { getField, updateField } from "vuex-map-fields";
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

  comment_empty = () => {
    return {
      id: null,
      creation_time: null,
      content: null,
      user_id: null,
      post_id: null,
    }
  },

  state_default = () => {
    return {
      section: false,
      active_id: null,

      //post info
      post: post_empty(),
      posts: [],
      languages: languages(),

      //comment info
      comment: comment_empty(),
      comments: [],

      //session info
      token: null,
      id: null,
      success: null,
      //TODO: add constraints
      //constraint: constraints[null],
    }
  },

  save_action_info = (state, res) => {
    state.token = res.token;
    state.success = res.status < 300;
    //TODO: add constraints here ?
    //state.constraint = constraints[res.data.constraint || null];
  };

  //TODO: not static, get languages over backend!
let languages = () => {
  return {
    lang_object: [
      {
          id: "278649c2-729d-4150-ba7e-7edd84e8c413",
          name: "javascript"
      },
      {
          id: "2009870f-3b0e-4989-ae4d-1c577110197b",
          name: "python"
      },
      {
          id: "4a113645-b11c-4235-9854-ac6b3bc5c1bf",
          name: "java"
      },
      {
          id: "3003d110-4ee0-4353-ba68-4d3eb0ef1197",
          name: "c#"
      },
      {
          id: "43a322dd-305d-4d6a-bdf0-897ae33ee075",
          name: "c++"
      }
    ]
  }
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

    resetPosts(state) { 
      state.post = post_empty();
    },

    resetComments(state) {
      state.comment = comment_empty();
    },

    authorizationUser(state , payload) {
      state.token = payload.token;
      state.id = payload.id;
    },

    deleteAuthorizationUser(state) {
      state.token = null;
      state.id = null;
    },


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
    authorizationUser({ state, commit }, payload) {
      commit("authorizationUser", payload);
    },

    deleteAuthorizationUser({ state, commit }) {
      commit("deleteAuthorizationUser");
    },

    async postPost({ state, post }) {
      const data = {

      }
      const res = await postJson(state.token, `${paths.posts}`, data);
      save_action_info(state, res);
    },

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
    },

    async patchPost({ state }) {
      const res = await patchJson(state.token, `${paths.posts}/${state.post.id}`, {
        title: state.post.title ? state.post.title.trim() : null,
        content: state.post.content ? state.post.content.trim() : null,
        language_id: state.post.language ? state.post.language : null,
        categories: state.post.categories ? state.post.categories : null,
      });
      save_action_info(state, res);
    },

    async deletePost({ state }) {
      const res = await deleteJson(state.token, `${paths.posts}${state.post.id}`);
      save_action_info(state, res);
    },

    async searchPost({ state }) {
      //TODO: implement data after Moritz implemented getPostSearch
      let data = {};
      const res = await getJson(state.token, `${paths.posts}/search/`, data);
      save_action_info(state, res);
    },

    //TODO: implement with id?
    async getLanguage({ state }) {
      const res = await getJson(state.token, `${paths.languages}`);
      save_action_info(state, res);
    },

    async getComments({ state }) {
      const res = await getJson(state.token, `${paths.comments}`);
      save_action_info(state, res);
      state.comments = res.status === 200 ? res.data : [];
    },

    async getComment({ state }) {
      const res = await getJson(state.token, `${paths.comments}`);
      save_action_info(state, res);
      if (res.status === 200) {
        const data = res.data;
        state.comment = data.comment;
      }
    },

    async postComment({ state }) {
      const data = {
        content: state.comment.content,
        post_id: state.post.id,
        user_id: state.id,
      }
      const res = await postJson(state.token, `${paths.comments}`);
      save_action_info(state, res);
      state.comments = res.status === 200 ? res.data : [];
    },

    async deleteComment({ state }) {

    },

    async postLike({ state }) {
      
    },

    async deleteLike({ state }) {

    },

    async postLikeComment({ state }) {
      
    },

    async deleteLikeComment({ state }) {

    },

  },
  /* modules: 
  {
  }*/
};


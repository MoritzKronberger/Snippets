import { getField, updateField } from "vuex-map-fields";
import { paths } from "/json/config.json";
import { postJson, getJson, patchJson, deleteJson } from "/js/service/rest";
import jwt_decode from "jwt-decode";

const post_empty = () => {
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
      comments: []
    };
  },
  input_post_empty = () => {
    return {
      language: null,
      content: null,
      title: null,
      categories: null,
    };
  },
  comment_empty = () => {
    return {
      id: null,
      creation_time: null,
      content: null,
      user_id: null,
      post_id: null,
    };
  },
  like_empty = () => {
    return {
      id: null,
      user_id: null,
      post_id: null,
      comment_id: null,
      subject_id: null,
    };
  },
  state_default = () => {
    return {
      section: false,
      active_id: null,

      //post info
      input_post: input_post_empty(),
      post: post_empty(),
      posts: [],

      //language info: language.id and language.username
      language: null,
      languages: null,

      //comment info
      comment: comment_empty(),
      comments: [],

      //like info
      like: like_empty(),
      likes: [],

      //session info
      token: null,
      id: null,
      success: null,
      //TODO: add constraints
      //constraint: constraints[null],
    };
  },
  save_action_info = (state, res) => {
    state.token = res.token;
    state.success = res.status < 300;
    //TODO: add constraints here ?
    //state.constraint = constraints[res.data.constraint || null];
  };

export default {
  namespaced: true,
  state: state_default(),

  getters: {
    getField,

    isNotAuthorized: (state) => !state.token,
    isAuthorized: (state) => !!state.token // bug: Token muss gültig sein
  },

  mutations: {
    updateField,

    resetPosts(state) {
      state.post = post_empty();
    },

    resetComments(state) {
      state.comment = comment_empty();
    },

    authorizationUser(state, payload) {
      this.state.token = payload.token;
      this.state.id = payload.id;
    },

    deleteAuthorizationUser(state) {
      state.token = null;
      state.id = null;
    },

    setPosts(state, payload) {
      state.posts = payload;
    },

    setLanguages(state, payload) {
      state.languages = payload;
    },
  },

  actions: {
    authorizationUser({ state, commit }, payload) {
      console.log("authorize", payload.token);
      commit("authorizationUser", payload);
    },

    deleteAuthorizationUser({ state, commit }) {
      commit("deleteAuthorizationUser");
    },

    async postPost({ state }) {
      console.log("isAuth:", this.state.token);
      const data = {
        language_id: state.input_post.language.id,
        content: state.input_post.content,
        title: state.input_post.title,
        categories: state.input_post.categories,
      };
      const res = await postJson(this.state.token, `${paths.posts}`, data);
      console.log("res:", res);
      save_action_info(this.state, res);
    },

    async getPost({ state }) {
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

    async getPosts({ state, commit }) {
      const res = await getJson(state.token, `${paths.posts}`);
      save_action_info(state, res);
      res.status === 200
        ? commit("setPosts", res.data)
        : commit("setPosts", []);
    },

    async patchPost({ state }) {
      const data = {
        title: state.post.title ? state.post.title.trim() : null,
        content: state.post.content ? state.post.content.trim() : null,
        language_id: state.post.language ? state.post.language : null,
        categories: state.post.categories ? state.post.categories : null,
      };
      const res = await patchJson(
        state.token,
        `${paths.posts}/${state.post.id}`,
        data
      );
      save_action_info(state, res);
    },

    async deletePost({ state }) {
      const res = await deleteJson(
        state.token,
        `${paths.posts}${state.post.id}`
      );
      save_action_info(state, res);
    },

    async searchPost({ state }) {
      //TODO: implement data after Moritz implemented getPostSearch
      let data = {};
      const res = await getJson(state.token, `${paths.posts}/search/`, data);
      save_action_info(state, res);
    },

    async getLanguages({ state, commit }) {
      const res = await getJson(state.token, `${paths.languages}`);
      save_action_info(state, res);
      if (res.status === 200) {
        state.languages = res.data;
        commit("setLanguages", res.data);
      }
      console.log("lang:", state.languages);
    },

    async getLanguage({ state }) {
      const res = await getJson(
        state.token,
        `${paths.languages}/${state.language.id}`
      );
      save_action_info(state, res);
      if (res.status === 200) {
        state.language = res.data;
      }
    },

    async getComments({ state }) {
      const res = await getJson(state.token, `${paths.comments}`);
      save_action_info(state, res);
      state.comments = res.status === 200 ? res.data : [];
      state.posts.forEach( function (p) {
        let commentArray = [];
        res.data.forEach( function (c) {
          if (c.post_id == p.id) {
            commentArray.push(c); 
          }
        });
        p.comments = commentArray;
      });
    },

    async getComment({ state }) {
      const res = await getJson(state.token, `${paths.comments}/${comment.id}`);
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
      };
      const res = await postJson(state.token, `${paths.comments}`, data);
      save_action_info(state, res);
      state.comments = res.status === 200 ? res.data : [];
    },

    async deleteComment({ state }) {
      const res = await deleteJson(
        state.token,
        `${paths.comments}/${state.comment.id}`
      );
      save_action_info(state, res);
    },

    async postPostLike({ state }) {
      const data = { user_id: state.id, post_id: state.post.id };
      const res = await postJson(state.token, `${paths.userLikes}`, data);
      save_action_info(state, res);
    },

    async deletePostLike({ state }) {
      const res = await deleteJson(
        state.token,
        `${paths.userLikes}/${state.like.id}`
      );
      save_action_info(state, res);
    },

    async postCommentLike({ state }) {
      const data = { user_id: state.id, comment_id: state.comment.id };
      const res = await postJson(state.token, `${paths.userLikes}`, data);
      save_action_info(state, res);
    },

    async deleteCommentLike({ state }) {
      const res = await deleteJson(
        state.token,
        `${paths.userLikes}/${state.like.id}`
      );
      save_action_info(state, res);
    },
  },
  /* modules: 
  {
  }*/
};

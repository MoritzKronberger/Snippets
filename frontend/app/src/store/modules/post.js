import { getField, updateField } from "vuex-map-fields";
import { paths } from "/json/config.json";
import { postJson, getJson, patchJson, deleteJson } from "/js/service/rest";

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
      comments: [],
      likedByCurrentUser: false,
    };
  },
  input_post_empty = () => {
    return {
      language_id: null,
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
      username: null,
      post_id: null,
      likedByCurrentUser: false,
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
      languages: [],

      //comment info
      comment: comment_empty(),
      comments: [],

      //like info
      like: like_empty(),
      likes: [],

      //sorting info
      sortings: [],

      //TODO: add constraints
      //constraint: constraints[null],
    };
  };

export default {
  namespaced: true,
  state: state_default(),

  getters: {
    getField
  },

  mutations: {
    updateField,

    resetPosts(state) {
      state.post = post_empty();
    },

    resetComments(state) {
      state.comment = comment_empty();
    },
  },

  actions: {
    async postPost({ rootState, state, commit }) {
      const input_post = state.input_post;
      const data = {
        language_id: input_post.language_id,
        content: input_post.content,
        title: input_post.title,
        categories: input_post.categories,
      };
      const res = await postJson(rootState.token, `${paths.posts}`, data);
      /* if (res.status === 200) {
        Object.assign(state.post, res.data);
      } */
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async getPost({ rootState, state, commit }) {
      let post = state.post;
      console.log("getPost");
      const res = await getJson(rootState.token, `${paths.posts}/${post.id}`);
      commit('saveSessionInfo', res, { root: true });
      if (res.status === 200) {
        const data = res.data;
        post.id = data.id;
        post.creation_time = data.creation_time;
        post.title = data.title;
        post.content = data.content;
        post.language = data.language;
        post.user_id = data.user_id;
        post.username = data.username;
        post.profile_picture = data.profile_picture;
        post.num_likes = data.num_likes;
        post.num_comments = data.num_comments;
        post.categories = data.categories;
      }
      return res.status < 300;
    },

    async getPosts({ rootState, state, commit }) {
      const res = await getJson(rootState.token, `${paths.posts}`);
      if (res.status === 200) {
        Object.assign(state.posts, res.data);
      }
      console.log("posts:", state.posts);
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async patchPost({ rootState, state, commit }) {
      const post = state.post;
      const data = {
        title: post.title ? post.title.trim() : null,
        content: post.content ? post.content.trim() : null,
        language_id: post.language ? post.language : null,
        categories: post.categories ? post.categories : null,
      };
      const res = await patchJson(rootState.token, `${paths.posts}/${post.id}`, data);
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async deletePost({ rootState, state, commit }) {
      const res = await deleteJson(rootState.token, `${paths.posts}${state.post.id}`);
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async searchPost({ rootState, state, commit }) {
      //TODO: implement data after Moritz implemented getPostSearch
      let data = {};
      const res = await getJson(rootState.token, `${paths.posts}/search/`, data);
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async getLanguages({ rootState, state, commit }) {
      const res = await getJson(rootState.token, `${paths.languages}`);
      if (res.status === 200) {
        Object.assign(state.languages, res.data);
      }
      console.log("lang:", state.languages);
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async getLanguage({ rootState, state, commit }) {
      let language = state.langugage;
      const res = await getJson(rootState.token, `${paths.languages}/${language.id}`);
      if (res.status === 200) {
        Object.assign(state.language, res.data);
      }
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async getComments({ rootState, state, commit }) {
      let comments = state.comments;
      let posts = state.posts;
      const res = await getJson(rootState.token, `${paths.comments}`);
      if (res.status === 200) {
        Object.assign(state.comments, res.data);
      }
      
      for (let p of posts) {
        let commentArray = [];
        for (let c of comments) {
          if (c.post_id == p.id) {
            commentArray.push(c);
          }
        }
        p.comments = commentArray;
      }
      console.log("posts with comments:", posts);
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    //TODO: set comment in state when clicked on, active_id
    async getComment({ rootState, state, commit }) {
      let comment = state.comment;
      const res = await getJson(rootState.token, `${paths.comments}/${comment.id}`);
      if (res.status === 200) {
        Object.assign(state.comment, res.data);
      }
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async postComment({ rootState, state, commit }) {
      const data = {
        content: state.comment.content,
        post_id: state.active_id,
        user_id: rootState.id,
      };
      const res = await postJson(rootState.token, `${paths.comments}/${state.active_id}`, data);
      /* if (res.status === 200) {
        Object.assign(state.comment, res.data);
      } */
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async deleteComment({ rootState, state, commit }) {
      const res = await deleteJson(rootState.token, `${paths.comments}/${state.comment.id}`);
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async getLikes({ rootState, state, commit }) {
      console.log("state getLikes:", state);
      let likes = state.likes;
      let posts = state.posts;
      let comments = state.comments;
      const res = await getJson(rootState.token, `${paths.likes}`);
      if (res.status === 200) {
        Object.assign(state.likes, res.data);
      }
      console.log("likes:", state.likes);
      
      for (let l of likes) {
        if (l.user_id == rootState.id) {
          let found = false;
          for (let p of posts) {
            if (l.subject_id == p.id) {
              p.likedByCurrentUser =  true;
              found = true;
              console.log("found like titled:", p.title);
              break;
            }
          }
          if (!found) {
            for (let c of comments) {
              if (l.subject_id == c.id) {
                c.likedByCurrentUser =  true;
                found = true;
                console.log("found like comment:", c.content);
                break;
              }
            };
          }
        }
      }
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async postPostLike({ rootState, state, commit }) {
      const data = { user_id: rootState.id, subject_id: state.post.id };
      const res = await postJson(rootState.token, `${paths.userLikes}`, data);
      /* if (res.status === 200) {
        Object.assign(state.like, res.data);
      } */
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async deletePostLike({ rootState, state, commit }) {
      const res = await deleteJson(rootState.token, `${paths.userLikes}/${state.like.id}`);
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async postCommentLike({ rootState, state, commit }) {
      const data = { user_id: rootState.id, subject_id: state.comment.id };
      const res = await postJson(rootState.token, `${paths.userLikes}`, data);
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async deleteCommentLike({ rootState, state, commit }) {
      const res = await deleteJson(rootState.token, `${paths.userLikes}/${state.like.id}`);
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async getSortings({ rootState, state, commit }) {
      const res = await getJson(rootState.token, `${paths.sorting}`);
      if (res.status === 200) {
        Object.assign(state.sortings, res.data);
      }
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },
  },
  /* modules: 
  {
  }*/
};

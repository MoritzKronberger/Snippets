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
      content:[{input: null}],
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
      user_query: null,
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
      let categories = input_post.categories;
      const data = {
        language_id: input_post.language_id,
        content: input_post.content,
        title: input_post.title,
        categories: categories,
      };
      const res = await postJson(rootState.token, `${paths.posts}`, data);
      //only save the current data into post if it got sent to db
      if (res.status === 200) {
        Object.assign(state.post, data);
      }
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async getPosts({ rootState, state, commit }, sorting_id, query) {
      let s_id = sorting_id || state.sortings[0].id;
      state.user_query != null ? query = state.user_query : null
      console.log(query);
      console.log("sorting:", s_id);
      const res = await getJson(rootState.token, `${paths.posts}/?sorting_id=${s_id}&?query_string=${query}`);
      if (res.status === 200) {
        Object.assign(state.posts, res.data);
      }
      console.log("posts:", state.posts);
      state.user_query = null;
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async patchPost({ rootState, state, commit }) {
      const post = state.post;
      let categories = post.categories.split(" ");
      const data = {
        title: post.title ? post.title.trim() : null,
        content: post.content ? post.content.trim() : null,
        language_id: post.language ? post.language : null,
        categories: categories ? categories : null,
      };
      const res = await patchJson(rootState.token, `${paths.posts}/${state.active_id}`, data);
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async deletePost({ rootState, state, commit }) {
      const res = await deleteJson(rootState.token, `${paths.posts}/${state.active_id}`);
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

    async postComment({ rootState, state, commit }) {
      const data = {
        content: state.comment.content.input,
      };
      const res = await postJson(rootState.token, `${paths.comments}/${state.active_id}`, data);
      /* if (res.status === 200) {
        Object.assign(state.comment, res.data);
      } */
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async deleteComment({ rootState, state, commit }) {
      const res = await deleteJson(rootState.token, `${paths.comments}/${state.active_id}`);
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
              break;
            }
          }
          if (!found) {
            for (let c of comments) {
              if (l.subject_id == c.id) {
                c.likedByCurrentUser =  true;
                found = true;
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
      const data = { post_id: state.active_id };
      const res = await postJson(rootState.token, `${paths.likes}`, data);
      if (res.status === 200 || res.status === 201) {
        Object.assign(state.like, res.data);
        for (let p of state.posts) {
          if (p.id == state.active_id) {
            p.likedByCurrentUser = true;
          }
        }
      }
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async deletePostLike({ rootState, state, commit }) {
      let res;
      for (let p of state.posts) {
        if (p.id == state.active_id) {
          if (p.likedByCurrentUser) {
            const data = { user_id: rootState.id, post_id: state.active_id }
            res = await deleteJson(rootState.token, `${paths.likes}/${state.like}`, data);
            if (res.status < 300) {
              commit('saveSessionInfo', res, { root: true });
              p.likedByCurrentUser = false;
            }
          }
        }
      }
      return res.status < 300;
    },

    async postCommentLike({ rootState, state, commit }) {
      const data = { comment_id: state.active_id };
      const res = await postJson(rootState.token, `${paths.likes}`, data);
      if (res.status === 200 || res.status === 201) {
        Object.assign(state.like, res.data);
        for (let c of state.comments) {
          if (c.id == state.active_id) {
            c.likedByCurrentUser = true;
          }
        }
      }
      commit('saveSessionInfo', res, { root: true });
      return res.status < 300;
    },

    async deleteCommentLike({ rootState, state, commit }) {
      let res;
      for (let c of state.comments) {
        if (c.id == state.active_id) {
          if (c.likedByCurrentUser) {
            const data = { user_id: rootState.id, comment_id: state.active_id }
            res = await deleteJson(rootState.token, `${paths.likes}/${state.like}`, data);
            if (res.status < 300) {
              commit('saveSessionInfo', res, { root: true });
              c.likedByCurrentUser = false;
            }
          }
        }
      }
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

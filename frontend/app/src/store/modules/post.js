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
      content: [{ input: null }],
      user_id: null,
      username: null,
      post_id: null,
      num_likes: null,
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
      filter_id: null,
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
    };
  };

export default {
  namespaced: true,
  state: state_default(),

  getters: {
    getField,
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
      let categories; 
      input_post.categories != null ? categories = input_post.categories.split(" ") : null;
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
      commit("saveSessionInfo", res, { root: true });
      return res.status < 300;
    },

    async getPosts({ rootState, state, commit }) {
      let s_id = state.filter_id || state.sortings[0].id;
      let res;
      if (state.user_query == undefined) {
        res = await getJson(rootState.token, `${paths.posts}/?sorting_id=${s_id}`);
      } else {
        res = await getJson(rootState.token, `${paths.posts}/?sorting_id=${s_id}&query_string=${state.user_query}`);
      }

      if (res.status === 200) {
        state.posts = res.data;
        //not working: Object.assign(state.posts, res.data);
      }
      state.user_query = null;
      commit("saveSessionInfo", res, { root: true });
      return res.status < 300;
    },

    async deletePost({ rootState, state, commit }) {
      const res = await deleteJson(rootState.token, `${paths.posts}/${state.active_id}`);
      commit("saveSessionInfo", res, { root: true });
      state.posts = state.posts.filter((post) => post.id !== state.active_id);
      return res.status < 300;
    },

    async getLanguages({ rootState, state, commit }) {
      const res = await getJson(rootState.token, `${paths.languages}`);
      if (res.status === 200) {
        Object.assign(state.languages, res.data);
      }
      commit("saveSessionInfo", res, { root: true });
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
      commit("saveSessionInfo", res, { root: true });
      return res.status < 300;
    },

    async postComment({ rootState, state, commit }) {
      let data = {
        content: state.comment.content[0].input,
      };
      const res = await postJson(rootState.token, `${paths.comments}/${state.active_id}`, data);
      commit("saveSessionInfo", res, { root: true });

      if (res.status < 300) {
        for (let post of state.posts) {
          if (post.id == state.active_id) {
            data.id = res.data.id;
            data.user_id = rootState.id;
            data.username = rootState.auth.user.username;
            data.post_id = state.active_id;
            data.likedByCurrentUser = false;
            data.num_likes = null;
            let t = new Date(Date.now()).toISOString();
            data.creation_time = t;
            post.comments.push(data);
          }
        }
        state.comments.push(data);
      }

      return res.status < 300;
    },

    async getLikes({ rootState, state, commit }) {
      let likes = state.likes;
      let posts = state.posts;
      let comments = state.comments;
      const res = await getJson(rootState.token, `${paths.likes}`);

      if (res.status === 200) {
        Object.assign(state.likes, res.data);
      }

      for (let l of likes) {
        if (l.user_id == rootState.id) {
          let found = false;
          for (let p of posts) {
            if (l.subject_id == p.id) {
              p.likedByCurrentUser = true;
              found = true;
              break;
            }
          }
          if (!found) {
            for (let c of comments) {
              if (l.subject_id == c.id) {
                c.likedByCurrentUser = true;
                found = true;
                break;
              }
            }
          }
        }
      }
      commit("saveSessionInfo", res, { root: true });
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
            p.num_likes++;
          }
        }
      }
      commit("saveSessionInfo", res, { root: true });
      return res.status < 300;
    },

    async deletePostLike({ rootState, state, commit }) {
      let res;
      for (let p of state.posts) {
        if (p.id == state.active_id) {
          if (p.likedByCurrentUser) {
            const data = { user_id: rootState.id, post_id: state.active_id };
            res = await deleteJson(rootState.token, `${paths.likes}`, data);

            if (res.status < 300) {
              commit("saveSessionInfo", res, { root: true });
              p.likedByCurrentUser = false;
              p.num_likes--;
            }
          }
        }
      }
      return res.status < 300;
    },

    async postCommentLike({ rootState, state, commit }, id) {
      const data = { comment_id: id };
      const res = await postJson(rootState.token, `${paths.likes}`, data);
      if (res.status === 200 || res.status === 201) {
        Object.assign(state.like, res.data);
        for (let c of state.comments) {
          if (c.id == id) {
            c.likedByCurrentUser = true;
            c.num_likes++;
          }
        }
      }
      commit("saveSessionInfo", res, { root: true });
      return res.status < 300;
    },

    async deleteCommentLike({ rootState, state, commit }, id) {
      let res;
      for (let c of state.comments) {
        if (c.id == id) {
          if (c.likedByCurrentUser) {
            const data = { user_id: rootState.id, comment_id: id };
            res = await deleteJson(rootState.token, `${paths.likes}`, data);

            if (res.status < 300) {
              commit("saveSessionInfo", res, { root: true });
              c.likedByCurrentUser = false;
              c.num_likes--;
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
      commit("saveSessionInfo", res, { root: true });
      return res.status < 300;
    },
  },
};

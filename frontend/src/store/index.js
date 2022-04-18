import { createStore } from 'vuex'

export default createStore({
  state: {
    modalProfil: false,
    modalPost: false,
    modalComment: false,
    commentUserId: null,
    commentPostId: null,
    commentsCount: null,
    currentUserId: null,
    postMessage: ""
  },
  getters: {
  },
  mutations: {
    SHOW_MODAL_PROFIL(state) {
      state.modalProfil = !state.modalProfil
    },
    SHOW_MODAL_POST(state) {
      state.modalPost = !state.modalPost
    },
    SHOW_MODAL_COMMENT(state) {
      state.modalComment = !state.modalComment
    }
  },
  actions: {
  },
  modules: {
  }
})

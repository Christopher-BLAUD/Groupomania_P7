import { createStore } from 'vuex'

export default createStore({
  state: {
    // Affichage des modals
    modalProfil: false,
    modalPost: false,
    modalComment: false,
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



export default {
  namespaced: true,
  mutations: {
    toggleIsAuthPopup(state) {
      state.authPopup = !state.authPopup;
    },
    toggleIsError(state) {
      state.errorPopup = !state.errorPopup
    }
  },
  state: {
    authPopup: false,
    errorPopup:false,
  },
  getters: {
    isAuthPopup(state) {
      return state.authPopup;
    },
    isError(state) {
      return state.authPopup;
    },
  },
};
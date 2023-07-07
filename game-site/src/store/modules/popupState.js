

export default {
  namespaced: true,
  mutations: {
    toggleIsAuthPopup(state) {
      state.authPopup = !state.authPopup;
    },
    toggleIsError(state) {
      state.errorPopup = !state.errorPopup
    },
    toggleIsUserMenu(state) {
      state.userPopup = !state.userPopup
    },
    hideIsUserMenu(state) {
      state.userPopup = false
    },
    
  },
  state: {
    authPopup: false,
    errorPopup:false,
    userPopup:false,

  },
  getters: {
    isAuthPopup(state) {
      return state.authPopup;
    },
    isError(state) {
      return state.errorPopup;
    },
    isUserMenu(state) {
      return state.userPopup;
    },
  },
};
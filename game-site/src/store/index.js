import {createStore} from 'vuex'
import featuredCat from './modules/featuredCat'
import auth from './modules/auth'
import login from './modules/login'
import logout from './modules/logout'
import headBannerState from './modules/headBannerState'
import app from './modules/app'
import search from './modules/search'
import popupState from './modules/popupState'
import profile from './modules/profile'

export const store =  createStore({
  modules: {
    featuredCat,
    auth,
    login,
    logout,
    headBannerState,
    app,
    search,
    popupState,
    profile
  },
})
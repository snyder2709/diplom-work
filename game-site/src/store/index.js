import {createStore} from 'vuex'
import featuredCat from './modules/featuredCat'
import auth from './modules/auth'
import login from './modules/login'
import logout from './modules/logout'
import headBannerState from './modules/headBannerState'
import app from './modules/app'

export const store =  createStore({
  modules: {
    featuredCat,
    auth,
    login,
    logout,
    headBannerState,
    app
  },
})
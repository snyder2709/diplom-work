import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  namespaced: true,
  actions: {
    async fetchUser(ctx) {
      try {
        const token = Cookies.get('steam-token');
        if(typeof token !== "undefined"){
          const response = await axios.post(
            'http://localhost:3000/user/authorization',
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          ctx.commit('updateUser', response.data);
        }
        else{
          ctx.commit('updateUser', null);
          console.log("Токен авторизации отсутсвует")
        }
      } catch (error) {
        console.error(error);
        ctx.commit('updateUser', null);
      }
    },
  },
  mutations: {
    updateUser(state, data) {
      state.user = data;
    },
    resetUser(state) {
      state.user = null
    }
  },
  state: {
    user: null,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
};

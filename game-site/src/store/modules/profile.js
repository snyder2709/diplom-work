import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    namespased: true,
    actions: {
        async getOwnedApp(ctx) {
            try {
              const token = Cookies.get('steam-token');
              if(typeof token !== "undefined"){
                const response = await axios.post(
                  'http://localhost:3000/user/ownedapp',
                  null,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                console.log(response.data)
                ctx.commit('updateOwnedApp', response.data);
              }
              else{
                ctx.commit('updateOwnedApp', null);
                console.log("Токен авторизации отсутсвует")
              }
            } catch (error) {
              console.error(error);
              ctx.commit('updateOwnedApp', null);
            }
          },
    },
    mutations: {
        updateOwnedApp(state, data) {
            state.ownedApp = data
        },
    },
    state: {
        ownedApp: null,
    },
    getters: {
        getDataOwnedApp(state) {
            return state.ownedApp
        },
    },

}
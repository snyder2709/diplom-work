import axios from 'axios';
export default {
    namespased:true,
      actions: {
          async getTopGameForBanner(ctx) {
            try {
              const data = await axios.get("http://localhost:3000/gameApi/top-games");
              const resData = await data.data
              ctx.commit("updateBanner",resData);
            }
            catch(e){
            //   ctx.rootStore.commit('errorModule/setError',e.message);
            console.log(e.message)
              
            }
        }
      },
      mutations: {
          updateBanner(state, data) {
              state.bannerData = data
          },
      },
      state: {
          bannerData:null,
      },
      getters: {
          getDataBanner(state) {
            return state.bannerData
          },
        },
      
  }
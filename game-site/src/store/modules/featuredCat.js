
export default {
  namespased:true,
    actions: {
        async getFeaturedCat(ctx) {
          try {
            const data = await fetch("http://localhost:3000/gameApi/featured-categories");
            const resData = await data.json();
            resData.forEach(category => {
              if (category.name === "Spotlights") {
                ctx.commit("updateSpotlights", category.items);
              } else if (category.name === "Top Sellers") {
                ctx.commit("updateTopSellers", category.items);
              } else if (category.name === "New Releases") {
                ctx.commit("updateNewReleases", category.items);
              } else if (category.name === "Coming Soon") {
                ctx.commit("updateComingSoon", category.items);
              }
            });
            // ctx.rootStore.commit('load/setLoad',true)
          }
          catch(e){
            ctx.rootStore.commit('errorModule/setError',e.message);
            
          }
      }
    },
    mutations: {
        updateSpotlights(state, data) {
            state.spotlights.push(data)
        },
        updateTopSellers(state, data) {
            state.topSellers = data
        },
        updateNewReleases(state, data) {
            state.newReleases = data
        },
        updateComingSoon(state, data) {
            state.comingSoon = data
        },
    },
    state: {
        spotlights:[],
        topSellers:null,
        newReleases:null,
        comingSoon:null,
        // topGame,
    },
    getters: {
        getFeaturedCatItems(state) {
          return {
            spotlights: state.spotlights,
            topSellers: state.topSellers,
            newReleases: state.newReleases,
            comingSoon: state.comingSoon,
          };
        },
      },
    
}
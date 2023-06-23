
export default {
    namespased: true,
    actions: {
        async getAppId(ctx, id) {
            console.log(id)
            try {
                const getApp = await fetch(`http://localhost:3000/gameApi/app`,{
                    method: 'POST',
                    body: JSON.stringify({ id }), // Передача параметра ID в поле data
                    headers: {
                      'Content-Type': 'application/json',
                    },
                });
                const resData = await getApp.json()
                // ctx.rootStore.commit('load/updateLoad',true)
                ctx.commit("updateApp", resData);
            }
            catch (e) {
                //   ctx.rootStore.commit('errorModule/setError',e.message);
                console.log(e.message)

            }
        }
    },
    mutations: {
        updateApp(state, data) {
            state.app = data
        },
    },
    state: {
        app: null,
    },
    getters: {
        getDataApp(state) {
            return state.app
        },
    },

}
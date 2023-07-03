
export default {
    namespased: true,
    mutations: {
        updateLoad(state, data) {
            state.loadData = data
        },
    },
    state: {
        loadData: false,
    },

}
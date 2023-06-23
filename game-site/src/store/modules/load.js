
export default {
    namespased: true,
    mutations: {
        updateLoad(state, data) {
            state.load = data
        },
    },
    state: {
        load: false,
    },

}
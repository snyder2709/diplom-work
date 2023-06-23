
const state = {
    errors: [],
  };
  const mutations = {
    setError(state, error) {
      state.errors = error;
    },
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
  };
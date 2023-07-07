import axios from "axios"

export default {
    namespaced:true,
    actions:{
        async searchReq(ctx,query) {
            if(query) 
            console.log(query)
            try {
                const getData = await axios.get(`http://localhost:3000/gameApi/search?q=${query}`);
                const reqData = await getData.data;
                ctx.commit('upDateResultQuery',reqData)
            } catch (error) {
                console.log(error.message)
            }
           
        }
    },
    mutations: {
        upDateResultQuery(state,data) {
            state.resultQuery = data
        }
    },
    state:{
        resultQuery:null,
        popupResultList:false
    },
    getters: {
        getResultQuery(state) {
            return state.resultQuery
        },
        isPopupListQuery(state){
            return state.popupResultList
        }
    },


};
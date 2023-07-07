import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    namespaced: true,
    actions: {
        async logOn(ctx, { username, password }) {
            try {
                const response = await axios.post(
                    'http://localhost:3000/user/logOn',
                    { username, password }
                );
                console.log("данные получены")
                const token = response.headers['authorization'].split(' ')[1];
                Cookies.set('steam-token', token);
            } catch (error) {
                console.error(error);
            }
        }
    },
    // mutations: {
    //     setGuardCode(state, data) {
    //         state.code = data
    //     }
    // },
    // state: {
    //     code: null,
    // },
    // getters: {
    //     getGuardCode(state) {
    //        return state.code
    //     }
    // }
};

import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    namespaced: true,
    actions: {
        async loginUser(ctx, { username, password }) {
            try {
                console.log(username, password)
                const response = await axios.post(
                    'http://localhost:3000/auth/login',
                    { username, password }
                );
                const token = response.headers['authorization'].split(' ')[1];
                const need_codeGuard = response.data
                console.log(response.data)
                console.log(token);
                Cookies.set('steam-token', token);
            } catch (error) {
                console.error(error);
            }
        },
        async steamGuard(ctx, code) {
            try {
                console.log(code)
                const response = await axios.post(
                    'http://localhost:3000/auth/entercode', {code} );
                const resData = response.data
                console.log(resData);
            } catch (error) {
                console.error(error);
            }
        },
    },
    mutations:{
        setGuardCode(state,data){
            state.codeGuard = data
        }
    },
    state: {
        codeGuard: null,
    },
    getters:{
        getGuardCode(state,data){
            state.codeGuard = data
        }
    }
};

import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    namespaced: true,
    actions: {
        async logOn(ctx, { username, password }) {
            try {
                console.log(username, password)
                const response = await axios.post(
                    'http://localhost:3000/auth/logOn',
                    { username, password }
                );
                const need_code = response.data
                console.log(response.data)
                ctx.commit('setGuardCode', need_code)
            } catch (error) {
                console.error(error);
            }
        },
        async steamGuard(ctx, code) {
            try {
                console.log(code)
                await axios.post('http://localhost:3000/auth/entercode', { code });
            } catch (error) {
                console.error(error);
            }
        },
        async loggedOn(ctx) {
            const response = await axios.post(
                'http://localhost:3000/auth/loggedOn'
            );
            console.log("я почти зашел")
            const token = response.headers['authorization'].split(' ')[1];
            console.log(token);
            Cookies.set('steam-token', token);
        }
    },
    mutations: {
        setGuardCode(state, data) {
            state.code = data
        }
    },
    state: {
        code: null,
    },
    getters: {
        getGuardCode(state) {
           return state.code
        }
    }
};

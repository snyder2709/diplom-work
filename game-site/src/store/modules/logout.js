import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  namespaced: true,
  actions: {
    async logout() {
        try {
          const response = await axios.post(
            'http://localhost:3000/auth/logout',
             null
          );
          console.log(response.data)    
          Cookies.remove('steam-token');
        } catch (error) {
          console.error(error);
        }
    }
  },
};
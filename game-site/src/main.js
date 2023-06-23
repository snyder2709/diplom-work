import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
import './assets/main.scss'

const app = createApp(App)

app.use(store)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

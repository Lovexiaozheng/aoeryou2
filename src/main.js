import Vue from 'vue'
import App from './App.vue'
import './assets/fonts/font.css'
import './assets/fonts/zpix.ttf'

import '../node_modules/nes.css/css/nes.css'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'

Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.config.productionTip = false
Vue.use(VueRouter)
new Vue({
    render: h => h(App),
    router,
    axios,
}).$mount('#app')




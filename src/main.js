import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import anime from 'animejs/lib/anime.es.js';
Vue.prototype.$anime = anime


import {animeStore} from './animeStore'
Vue.prototype.$aStore = animeStore


import dayjs from './day.js'
Vue.prototype.$dayjs = dayjs


import VueLettering from '@miii/vue-lettering'
Vue.use(VueLettering, {
  // Optional plugin options
})


import "../src/style/font/mont.scss"


import  ElementUI  from 'element-ui';
Vue.use(ElementUI)



import http from "./http.js"
Vue.prototype.$http = http



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

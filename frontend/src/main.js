// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import App2 from './App2'
import router from './router'
import store from './store'
import axios from 'axios'
import io from 'socket.io-client'
import '../node_modules/vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$io = io("http://localhost:3000")
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App2 },
  template: '<App2/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import io from 'socket.io-client'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$io = io("http://localhost:3000")

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  sockets : {
    connect: function() {

    }
  }
})

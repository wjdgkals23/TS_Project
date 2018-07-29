import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersistedState({
    key: "pcb080bdk",
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key,value),
      removeItem: key => Cookies.remove(key)
    }
  })]
});

export default store;

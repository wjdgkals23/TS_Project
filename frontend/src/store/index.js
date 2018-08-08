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
  getters: {
    doctype_doc(state) {
      let temp = [];
      for(let i in state.distribute_doc){
        if(state.distribute_doc[i].doctype_num == state.selected_doc.id){
          temp.push(state.distribute_doc[i]);
        }
      }
      return temp;
    }
  },
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

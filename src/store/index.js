import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: `${process.env.VUE_APP_URL}`
  },
  getters:{
    getUrl({state}){
      return state.url;
    }
  },
  mutations: {
  },
  actions: {
  },

  modules: {
  }
})

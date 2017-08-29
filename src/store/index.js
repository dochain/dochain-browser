import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import auth from './modules/auth'
import wallet from './modules/wallet'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  isLoading: false,
  currentLeftMenu: ''
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    auth,
    wallet
  },
  strict: debug
})

export default store

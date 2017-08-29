import * as types from './mutation-types'

const mutations = {
  [types.SET_LEFT_MENU] (state, leftMenu) {
    state.currentLeftMenu = leftMenu
  },
  [types.SHOW_LOADING] (state) {
    state.isLoading = true
  },
  [types.HIDE_LOADING] (state) {
    state.isLoading = false
  }
}

export default mutations

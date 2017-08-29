import * as types from '../mutation-types'
import authApi from '@/http/restful/auth.js'

const state = {
  currentUser: null,
  authToken: null,
  loginErrorMessage: null,
  registerErrorMessage: null
}

const getters = {
  currentUser: state => state.currentUser,
  authToken: state => state.authToken,
  loginErrorMessage: state => state.loginErrorMessage,
  registerErrorMessage: state => state.registerErrorMessage
}

const actions = {
  // 登录
  login ({ commit, dispatch }, user) {
    // 清除错误信息
    commit(types.CLEAR_LOGIN_ERROR_MESSAGE)

    return new Promise((resolve, reject) => {
      authApi.login(user)
        .then(result => {
          // 设置用户信息
          resolve()
        })
        .catch(errorResult => {
          commit(types.SET_LOGIN_ERROR_MESSAGE, errorResult[0])
          reject()
        })
    })
  },
  // 注册
  register ({ commit, dispatch }, user) {
    // 清除错误信息
    commit(types.CLEAR_REGISTER_ERROR_MESSAGE)

    return new Promise((resolve, reject) => {
      authApi.register(user)
        .then(result => {
          // 设置用户信息
          resolve()
        })
        .catch(errorResult => {
          commit(types.SET_REGISTER_ERROR_MESSAGE, errorResult[0])
          reject()
        })
    })
  },
  // 退出
  logout ({ commit, dispatch }) {
    authApi.logout()
      .then(result => {
        commit(types.CLEAR_CURRENT_USER)
      })
      .catch(errorResult => {
      })
  },
  // 获取当前用户
  getCurrentUser ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      authApi.getUser()
        .then(result => {
          // 设置用户
          commit(types.SET_CURRENT_USER, result)
          resolve()
        })
        .catch(errorResult => {
          commit(types.CLEAR_CURRENT_USER)
          // 清除授权 TODO 可以判断是否有授权
          reject(errorResult[0])
        })
    })
  },
  clearLoginerrorMessage ({ commit }) {
    commit(types.CLEAR_LOGIN_ERROR_MESSAGE)
  },
  clearRegisterErrorMessage ({ commit }) {
    commit(types.CLEAR_REGISTER_ERROR_MESSAGE)
  }
}

const mutations = {
  [types.SET_CURRENT_USER] (state, user) {
    state.currentUser = { ...user }
  },
  [types.CLEAR_CURRENT_USER] (state) {
    state.currentUser = null
  },
  [types.SET_LOGIN_ERROR_MESSAGE] (state, errorMessage) {
    state.loginErrorMessage = errorMessage
  },
  [types.CLEAR_LOGIN_ERROR_MESSAGE] (state) {
    state.loginErrorMessage = null
  },
  [types.SET_REGISTER_ERROR_MESSAGE] (state, errorMessage) {
    state.registerErrorMessage = errorMessage
  },
  [types.CLEAR_REGISTER_ERROR_MESSAGE] (state) {
    state.registerErrorMessage = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

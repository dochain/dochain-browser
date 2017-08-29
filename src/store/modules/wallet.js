import * as types from '../mutation-types'
import walletApi from '@/http/restful/wallet.js'
import eth from '@/lib/eth'

const state = {
  transactionList: null,
  contractList: null,
  balance: '0.000000',
  walletErrorMessage: null,
  nonces: []
}

const getters = {
  transactionList: state => state.transactionList,
  contractList: state => state.contractList,
  balance: state => state.balance,
  walletErrorMessage: state => state.walletErrorMessage,
  nonces: state => state.nonces
}

const actions = {
  changeBalance ({ commit }, balance) {
    commit(types.SET_BALANCE, balance)
  },
  getBalance ({ commit }) {
    walletApi.getBalance()
      .then(result => {
        // 设置用户
        commit(types.SET_BALANCE, result.balance)
      })
      .catch(errorResult => {
      })
  },
  getTransactionList ({ commit }, hash) {
    // 清除交易
    commit(types.CLEAR_WALLET_ERROR_MESSAGE)

    // 获取交易列表
    return new Promise((resolve, reject) => {
      walletApi.getTransactionList(hash)
        .then(result => {
          // 设置用户
          if (result.data.length !== 0) {
            commit(types.SET_TRANSACTION_LIST, result.data)
          } else {
            commit(types.CLEAR_TRANSACTION_LIST)
          }
          resolve()
        })
        .catch(errorResult => {
          commit(types.SET_WALLET_ERROR_MESSAGE, errorResult[0])
          reject()
        })
    })
  },
  getContractList ({ commit }, hash, creat) {
    // 清除合约
    commit(types.CLEAR_WALLET_ERROR_MESSAGE)

    // 获取合约列表
    console.log(hash)
    walletApi.getContractList(hash, creat)
    .then(result => {
      // 设置用户
      if (result.length !== 0) {
        commit(types.SET_CONTRACT_LIST, result)
      } else {
        commit(types.CLEAR_CONTRACT_LIST)
      }
    })
    .catch(errorResult => {
      commit(types.SET_WALLET_ERROR_MESSAGE, errorResult[0])
    })
  },
  send ({ commit }, data) {
    // 清除错误
    commit(types.CLEAR_WALLET_ERROR_MESSAGE)

    // 发送交易
    return new Promise((resolve, reject) => {
      let account = eth.account.getDefault()
      let params = {}
      let sign = null
      let type = null

      // 判断是否是合约交易
      if (data.contract === '') {
        params = {
          to: data.address,
          value: data.amount
        }
        sign = eth.transaction.sign(params)
        type = 1
      } else {
        params = {
          to: data.address,
          value: data.amount,
          constractAddress: data.contract
        }
        sign = eth.transaction.signContract(params)
        type = 2
      }
      console.log(params)
      sign.then(sign => {
        let sendParams = {
          from: account.address,
          to: params.to,
          sign: sign,
          type: type
        }
        walletApi.send(sendParams)
          .then(result => {
            resolve()
          })
          .catch(errorResult => {
            commit(types.SET_WALLET_ERROR_MESSAGE, errorResult[0])
            reject()
          })
      })
        .catch(err => {
          console.log(err)
        })
    })
  },
  clearWalletErrorMessage ({ commit }) {
    // 清除错误
    commit(types.CLEAR_WALLET_ERROR_MESSAGE)
  },
  increaseNonce ({ commit }, address) {
    // 清除错误
    let nonces = state.nonces
    if (nonces[address]) {
      nonces[address] ++
      commit(types.SET_NONCES, nonces)
    }
  },
  getNonces ({ commit }) {
    return new Promise((resolve, reject) => {
      // 获取地址列表信息
      let account = eth.account.getDefault()
      walletApi.getTransactionCount(account.address)
        .then(result => {
          let nonces = {
            [account.address]: 0
          }
          if (result.hash) {
            nonces = {
              [result.hash]: result.nonce
            }
          }
          commit(types.SET_NONCES, nonces)
          resolve()
        })
        .catch(errorResult => {
          reject()
        })
    })
  }
}

const mutations = {
  [types.SET_BALANCE] (state, balance) {
    state.balance = balance
  },
  [types.CLEAR_BALANCE] (state) {
    state.balance = 0.0000000
  },
  [types.SET_TRANSACTION_LIST] (state, transactionList) {
    state.transactionList = transactionList
  },
  [types.CLEAR_TRANSACTION_LIST] (state) {
    state.transactionList = null
  },
  [types.SET_CONTRACT_LIST] (state, contractList) {
    state.contractList = contractList
  },
  [types.CLEAR_CONTRACT_LIST] (state) {
    state.contractList = null
  },
  [types.SET_WALLET_ERROR_MESSAGE] (state, walletErrorMessage) {
    state.walletErrorMessage = walletErrorMessage
  },
  [types.CLEAR_WALLET_ERROR_MESSAGE] (state) {
    state.walletErrorMessage = null
  },
  [types.SET_NONCES] (state, nonces) {
    state.nonces = nonces
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

import { webRequest, apiRequest } from '@/lib/http'

// Wallet的api
const walletApi = {
  getBalance () {
    return webRequest.get('/wallet/balance')
  },
  getTransactionList (accountHash) {
    return apiRequest.get(`/transactions/${accountHash}/account_hash`)
  },
  getContractList (isCreate) {
    return webRequest.get(`/wallet/contract/${isCreate}`)
  },
  send (data) {
    return webRequest.post('/wallet/transaction/send', data)
  },
  getTransactionCount (address) {
    return apiRequest.get(`/accounts/${address}`)
  }
}

export default walletApi

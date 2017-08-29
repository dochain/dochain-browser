<template>
  <div class="appContainer container">
  <component-left-menu></component-left-menu>
  <div class="appRightCol" style="padding-left:0px;">
    <div class="appHeader">
      <div class="appHeaderContent">
        <div class="row">
          <div class="col-xs-4">
            <h1 class="pageTitle ng-binding">交易列表</h1>
          </div>
          <div class="col-xs-8">
            <div class="text-right">
              <h1 class="ng-binding">
                <select class="btn btn-alt btn-default btn-lg">
                  <option selected value="">DOC</option>
                  <option v-if="(contractList)" v-for="contract in contractList" v-bind:value="contract.hash">
                    {{ contract.contractName }}
                  </option>
                </select>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <component-error v-if="walletErrorMessage" :errorMessage="walletErrorMessage"></component-error>
    <div class="appBody" v-else>
      <div class="appBodyContainer ng-scope">
        <div class="txList ng-scope">
          <div class="ng-scope">
            <div class="ng-isolate-scope">
              <div class="text-center ng-scope" >
                <div class="ng-scope">
                  <div class="noTransactions" v-if="!isLoading && !transactionList">
                    <i class="bticon bticon-doc-text"></i>
                    <h1 class="ng-binding">
                      尚无交易
                    </h1>
                    <h2 class="sentence-case ng-binding">
                      开始于
                      <router-link class="ng-binding" to="/receive">
                        为您的钱包注资
                      </router-link>
                    </h2>
                  </div>
                  <div style="padding: 10px 30px" v-if="(!isLoading && transactionList)">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>TxHash</th>
                          <th>Block</th>
                          <th>Age</th>
                          <th>From</th>
                          <th> </th>
                          <th>To</th>
                          <th>Value</th>
                          <th>[TxFee]</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="transaction in transactionList">
                          <td class="text-left">
                            <span class="short-address-tag a-color" @click="linkToBrowser(transaction.blockHash)">
                                {{transaction.blockHash}}
                            </span>
                          </td>
                          <td class="text-left">
                            {{transaction.blockNumber}}
                          </td>
                          <td class="text-left">{{transaction.createdAt | time}}</td>
                          <td class="text-left">
                            <span class="short-address-tag">{{transaction.from}}</span>
                          </td>
                          <td class="text-left"><i class="bticon bticon-right-circled2 green"></i></td>
                          <td class="text-left">
                            <i class="bticon bticon-doc-text"></i>
                            <span class="short-address-tag">{{transaction.to}}</span>
                          </td>
                          <td class="text-left">
                            <span class="label label-success" v-if="isEarnings(transaction.to)">+{{transaction.value|conversionEth}}</span>
                            <span class="label label-danger" v-else>-{{transaction.value|conversionEth}}</span>
                            </td>
                          <td class="text-left">{{transaction.gasPrice * transaction.gas|conversionEth}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="text-center loadingSpinner ng-scope" v-show="isLoading">
                    <div class="loading-spinner loading-spinner-">
                      <div class="loading loading-0"></div>
                      <div class="loading loading-1"></div>
                      <div class="loading loading-2"></div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import LeftMenu from '@/components/Wallet/LeftMenu'
import Balance from '@/components/Wallet/Balance'
import Error from '@/components/Exception/Error'
import { mapGetters } from 'vuex'

export default {
  name: 'wallet_index',
  components: {
    'component-left-menu': LeftMenu,
    'component-balance': Balance,
    'component-error': Error
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'transactionList',
      'contractList',
      'walletErrorMessage',
      'currentUser'
    ])
  },
  methods: {
    isEarnings (hash) {
      return this.currentUser.hash === hash
    },
    linkToBrowser (params) {
      window.open('http://browser.dochain.org/#/blocks/' + params)
    },
    changeContract (hash = '') {
      this.$router.push({
        path: '/transaction/' + hash
      })
    }
  },
  created () {
    // 设置左侧菜单
    this.$store.dispatch('changeLeftMenu', 'assets')
    console.log(this.currentUser.hash)
    // 获取交易列表
    this.$store.dispatch('showLoading')
    this.$store.dispatch('getTransactionList', this.currentUser.hash)
      .then(() => {
        this.$store.dispatch('hideLoading')
      })
      .catch(() => {
        this.$store.dispatch('hideLoading')
      })

    // 资产列表
    this.$store.dispatch('getContractList', 0)
  }
}
</script>
<style>
  .short-address-tag {
    width: 100px;
    display: inline-block;
    vertical-align: bottom;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .a-color {
    color: #2e9ad0;
  }
  .green {
    color: #5cb85c;
  }
</style>

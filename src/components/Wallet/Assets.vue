<template>
  <div class="appContainer container">
  <component-left-menu></component-left-menu>
  <div class="appRightCol" style="padding-left:0px;">
    <div class="appHeader">
      <div class="appHeaderContent">
        <div class="row">
          <div class="col-xs-4">
            <h1 class="pageTitle ng-binding">已创建资产</h1>
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
                  <div class="noTransactions" v-if="!isLoading && !contractList">
                    <i class="bticon bticon-doc-text"></i>
                    <h1 class="ng-binding">
                      暂无其他资产
                    </h1>
                    <h2 class="sentence-case ng-binding">
                      <router-link class="ng-binding" to="/contract">
                        创建新资产
                      </router-link>
                    </h2>
                  </div>
                  <div style="padding: 10px 30px" v-if="(!isLoading && contractList)">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th class="col-xs-6">名称</th>
                          <th class="col-xs-3">可用额度</th>
                          <th class="col-xs-3">单位</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr @click="pageTo(contract.hash)" v-for="contract in contractList">
                          <td class="text-left">
                            <span>{{contract.contractName}}</span>
                          </td>
                          <td class="text-left">
                            <span>{{contract.amount}}</span>
                          </td>
                          <td class="text-left">{{contract.units}}</td>
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
import Error from '@/components/Exception/Error'
import { mapGetters } from 'vuex'

export default {
  name: 'wallet_assets',
  components: {
    'component-left-menu': LeftMenu,
    'component-error': Error
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'contractList',
      'walletErrorMessage',
      'currentUser'
    ])
  },
  methods: {
    isEarnings (hash) {
      return this.currentUser.hash === hash
    },
    pageTo (hash = '') {
      this.$router.push({
        path: '/transaction/' + hash
      })
    }
  },
  created () {
    // 设置左侧菜单
    this.$store.dispatch('changeLeftMenu', 'assets')
    // 获取交易列表
    this.$store.dispatch('showLoading')
    this.$store.dispatch('getContractList', 1)
      .then(() => {
        this.$store.dispatch('hideLoading')
      })
      .catch(() => {
        this.$store.dispatch('hideLoading')
      })
  }
}
</script>

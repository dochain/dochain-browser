<template>
  <div class="appContainer container">
  <component-left-menu></component-left-menu>
  <div class="appRightCol" style="padding-left:0px;">
  <div class="appHeader">
    <div class="appHeaderContent">
      <div class="row">
        <div class="col-xs-4">
          <h1 class="pageTitle ng-binding">交易</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="appBody">
    <!-- uiView: mainView -->
    <div class="appBodyContainer ng-scope" ui-view="mainView">
      <div class="appPage ng-scope">
        <div class="ng-scope" v-show="isShowSuccess">
          <div class="noTransactions">
            <h1 class="ng-binding">
              发送成功
            </h1>
            <h2 class="sentence-case ng-binding">
              请去
              <router-link class="ng-binding" to="/wallet">
                我的钱包
              </router-link>
              查看发送结果
            </h2>
          </div>
        </div>
        <form class="form ng-pristine ng-invalid ng-invalid-required" name="sendInputForm" novalidate="" @submit.prevent="send()" v-show="!isShowSuccess">
          <div class="row">
            <div class="col-xs-12">
              <div class="form-group form-group-lg" :class="{'has-error': (errors.has('contractName')) }">
                <label class="control-label" for="recipient">
                    <span class="sentence-case ng-binding">域名</span>
                </label>
                <input
                  @focus="hideAlert"
                  data-vv-as="域名"
                  type="text"
                  placeholder="域名"
                  class="form-control"
                  name="contractName"
                  v-validate="'required'"
                  v-model="formData.contractName"
                >
                <span class="help help-block text-danger" v-show="errors.has('contractName')">
                  {{ errors.first('contractName') }}
                </span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="form-group form-group-lg" :class="{'has-error': (errors.has('amount')) }">
                <label class="control-label" for="recipient">
                    <span class="sentence-case ng-binding">总数</span>
                </label>
                <input
                  @focus="hideAlert"
                  data-vv-as="总数"
                  type="text"
                  placeholder="总数"
                  class="form-control"
                  name="amount"
                  v-validate="'required'"
                  v-model="formData.amount"
                >
                <span class="help help-block text-danger" v-show="errors.has('amount')">
                  {{ errors.first('amount') }}
                </span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="form-group form-group-lg" :class="{'has-error': (errors.has('units')) }">
                <label class="control-label" for="recipient">
                    <span class="sentence-case ng-binding">单位</span>
                </label>
                <input
                  @focus="hideAlert"
                  data-vv-as="单位"
                  type="text"
                  placeholder="单位"
                  class="form-control"
                  name="units"
                  v-validate="'required'"
                  v-model="formData.units"
                >
                <span class="help help-block text-danger" v-show="errors.has('units')">
                  {{ errors.first('units') }}
                </span>
              </div>
            </div>
          </div>
      <div class="row">
        <div class="col-xs-12">
          <span class="help text-danger has-error" v-if="walletErrorMessage">
            {{walletErrorMessage}}
          </span>
          <div class="form-group form-group-lg form-group-buttons">
            <button class="btn btn-lg btn-primary" type="submit" v-show="!isLoading">
              <span class="ng-binding">&nbsp;&nbsp; 发送 &nbsp;&nbsp;</span>
            </button>
            <div class="loading-spinner loading-spinner-" v-show="isLoading">
                <div class="loading loading-0"></div>
                <div class="loading loading-1"></div>
                <div class="loading loading-2"></div>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  </div>
</div>
  </div>
  </div>
</template>

<script>
import LeftMenu from '@/components/Wallet/LeftMenu'
import Balance from '@/components/Wallet/Balance'
import { mapGetters } from 'vuex'

export default {
  name: 'wallet_coutract',
  data () {
    return {
      formData: {
        amount: '',
        contractName: '',
        units: ''
      },
      isShowSuccess: false
    }
  },
  computed: mapGetters([
    'isLoading',
    'walletErrorMessage'
  ]),
  components: {
    'component-left-menu': LeftMenu,
    'component-balance': Balance
  },
  methods: {
    send () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('showLoading')
          this.$store.dispatch('send', this.formData)
            .then(() => {
              // 隐藏loading
              this.$store.dispatch('hideLoading')
              this.isShowSuccess = true
            })
            .catch(() => {
              this.$store.dispatch('hideLoading')
            })
        }
      })
    },
    hideAlert () {
      this.$store.dispatch('clearWalletErrorMessage')
    }
  },
  created () {
    // 设置左侧菜单
    this.$store.dispatch('changeLeftMenu', 'assets')

    // 清除错误信息
    this.$store.dispatch('clearWalletErrorMessage')

    // 资产列表
    this.$store.dispatch('getContractList', 0)
  }
}
</script>

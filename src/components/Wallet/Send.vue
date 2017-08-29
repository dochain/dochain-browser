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
              <div class="form-group form-group-lg" :class="{'has-error': (errors.has('address')) }">
                <label class="control-label" for="recipient">
                    <span class="sentence-case ng-binding">接收地址</span>
                </label>
                <input
                  @focus="hideAlert"
                  data-vv-as="接收地址"
                  type="text"
                  placeholder="接收地址"
                  class="form-control"
                  name="address"
                  v-validate="'required'"
                  v-model="formData.address"
                >
                <span class="help help-block text-danger" v-show="errors.has('address')">
                  {{ errors.first('address') }}
                </span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div class="form-group form-group-lg" :class="{'has-error': (errors.has('amount')) }">
                <label class="control-label ng-binding" for="recipient">金额</label>
                <div class="input-group input-group-lg">
                  <input
                    @focus="hideAlert"
                    data-vv-as="金额"
                    type="text"
                    class="form-control"
                    name="amount"
                    placeholder="0.00000000"
                    v-validate="'required|decimal'"
                    v-model="formData.amount"
                  >
                  <span class="input-group-addon currency">
                  </span>
                  <span class="input-group-btn">
                  <div class="btn-group dropdown">
                    <select class="btn btn-alt btn-default btn-lg" v-model="formData.contract" name="contract">
                      <option value="">DOC</option>
                      <option v-if="(contractList)" v-for="contract in contractList" v-bind:value="contract.hash ">
                        {{ contract.units }}
                      </option>
                    </select>
                  </div>
                  </span>
                </div>
              <span class="help help-block text-danger" v-show="errors.has('amount')">
                 {{ errors.first('amount') }}
              </span>
            </div>
          </div>
      </div>
      <div class="row ng-hide">
        <div class="col-xs-12">
          <div class="form-group form-group-lg form-slim">
            <label class="control-label ng-binding">交易费</label>
            <div class="custom-select">
              <div class="custom-select-choice" ng-click="showselect=true">
                <span class="custom-select-arrow">
                  <i class="bticon bticon-down-open"></i>
                </span>
                <div class="custom-option">
                  <div class="row">
                    <div class="col-xs-9">
                      <span class="custom-option-title ng-binding">
                        高优先级
                      </span>
                      <span class="help help-block custom-option-subtitle ng-binding">
                        推荐网络费用用于快速确认
                      </span>
                    </div>
                    <div class="col-xs-3">
                      <!-- ngIf: fees.optimal -->
                    </div>
                  </div>
                </div>
                <div class="custom-option ng-hide">
                  <div class="row">
                    <div class="col-xs-9">
                      <span class="custom-option-title ng-binding">
                        低优先级
                      </span>
                      <span class="help help-block custom-option-subtitle ng-binding">
                        交易确认时间可能需要几个小时
                      </span>
                    </div>
                    <div class="col-xs-3">
                      <!-- ngIf: fees.lowPriority -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="custom-select-menu ng-hide">
                <div class="custom-option selected" ng-class="{selected: sendInput.feeChoice == OPTIMAL_FEE}" ng-click="sendInput.feeChoice = OPTIMAL_FEE; showselect = false;">
                  <div class="row">
                    <div class="col-xs-9">
                      <span class="custom-option-title sentence-case ng-binding">
                        高优先级
                      </span>
                      <span class="help help-block custom-option-subtitle ng-binding">
                        推荐网络花费用于快速确认
                      </span>
                    </div>
                    <div class="col-xs-3">
                      <!-- ngIf: fees.optimal -->
                    </div>
                  </div>
                </div>
                <hr style="margin: 0px;">
                <div class="custom-option" ng-class="{selected: sendInput.feeChoice == LOW_PRIORITY_FEE}" ng-click="sendInput.feeChoice = LOW_PRIORITY_FEE; showselect = false;">
                  <div class="row">
                    <div class="col-xs-9">
                      <span class="custom-option-title sentence-case ng-binding">
                        低优先级
                      </span>
                      <span class="help help-block custom-option-subtitle ng-binding">
                        交易确认时间可能需要几个小时
                      </span>
                    </div>
                    <div class="col-xs-3">
                      <!-- ngIf: fees.lowPriority -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
// import eth from '@/lib/eth'
// import FileSaver from 'file-saver'

export default {
  name: 'wallet_send',
  data () {
    return {
      formData: {
        amount: '',
        address: '',
        contract: ''
      },
      isShowSuccess: false
    }
  },
  computed: mapGetters([
    'isLoading',
    'walletErrorMessage',
    'contractList'
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
    this.$store.dispatch('changeLeftMenu', 'send')

    // 清除错误信息
    this.$store.dispatch('clearWalletErrorMessage')

    // 资产列表
    this.$store.dispatch('getContractList', 0)

    // 获取nonces
    this.$store.dispatch('getNonces')

    // var blob = new Blob(['{"name":"chicheng"}'], {type: 'text/plain;charset=utf-8'})
    // FileSaver.saveAs(blob, 'private.txt')
  }
}
</script>

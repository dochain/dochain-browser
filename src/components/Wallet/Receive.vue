<template>
  <div class="appContainer container">
  <component-left-menu></component-left-menu>
  <div class="appRightCol" style="padding-left:0px;">
  <component-balance></component-balance>
  <div class="appBody" id="appBody">
    <!-- uiView: mainView -->
    <div class="appBodyContainer ng-scope" ui-view="mainView">
      <div class="appPage ng-scope">
        <div class="receivePaymentStatus" ng-class="{'text-success': paymentReceived}">
          <!-- ngIf: !paymentReceived -->
          <div ng-if="!paymentReceived" class="ng-scope">
            <span class="progress-spinner"><span class="bticon bticon-progress"></span></span> <span class="sentence-case ng-binding">等待支付</span>
          </div>
          <!-- end ngIf: !paymentReceived -->
          <!-- ngIf: paymentReceived -->
        </div>
        <form class="form ng-pristine ng-valid ng-valid-min ng-valid-required" name="sendInputForm" novalidate="" ng-init="showQR=false">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="form-group form-group-lg">
                <label class="control-label ng-binding">地址</label>
                <p class="address ng-binding">{{currentUser.hash}}</p>
                <span class="help-block ng-binding">
  已为您创建了一个新的域币地址。请使用此地址接收资金。
  <a class="btn btn-primary ng-binding btn-address-lookup" href="./address.html" style="display:none;">
     My addresses
  </a>
</span>
              </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12" style="display:none;">
              <div class="form-group form-group-lg">
                <label class="control-label ng-binding" for="amount">金额</label>
                <div class="input-group input-group-lg">
                  <input class="form-control" name="amount" placeholder="0.00000000" type="number">
                  <span class="input-group-addon currency"></span>
                  <span class="input-group-btn">
                  <div class="btn-group dropdown" dropdown="">
                    <button type="button" class="btn btn-alt btn-default btn-lg ng-binding dropdown-toggle">DOC</button>
                  </div>
                </span>
              </div>
              <span class="help help-block text-danger">
  <!-- ngIf: errors.amount -->
</span>
            </div>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12" style="display:none;">
            <div class="qrcode-display-section">
              <!-- ngIf: newRequest.bitcoinUri -->
              <div ng-if="newRequest.bitcoinUri" class="ng-scope">
                <a ng-href="bitcoin:335Nv6LUkLi2XPNmYeKg2yWnzZvYsGSjvj" href="bitcoin:335Nv6LUkLi2XPNmYeKg2yWnzZvYsGSjvj">
                    <canvas ng-hide="image" height="225" width="225" class="ng-hide"></canvas>
                    <!-- ngIf: image --><img ng-if="image" ng-src="data:image/png;base64,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" class="ng-scope" src="data:image/png;base64,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">
                </a>
                <!-- ngIf: !newRequest.address -->
              </div>
              <!-- end ngIf: newRequest.bitcoinUri -->
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
  name: 'wallet_receive',
  components: {
    'component-left-menu': LeftMenu,
    'component-balance': Balance
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'transactionList',
      'walletErrorMessage',
      'currentUser'
    ])
  },
  created () {
    this.$store.dispatch('changeLeftMenu', 'receive')
  }
}
</script>

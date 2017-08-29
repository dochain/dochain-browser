<template>
<div class="appHeader">
  <div class="appHeaderContent">
    <div class="row">
      <div class="col-xs-4">
        <h1 class="pageTitle ng-binding">交易</h1>
      </div>
      <div class="col-xs-8">
        <div class="text-right">
          <h1 class="ng-binding">
            {{balance|conversionEth}} DOC
          </h1>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'balance',
  computed: mapGetters([
    'balance'
  ]),
  created () {
    // 获取新的余额
    this.$store.dispatch('getBalance')
  }
}
</script>

<template>
<div class="appBody">
  <div class="appBodyContainer ng-scope">
    <div class="txList ng-scope">
      <div class="ng-scope">
        <div class="ng-isolate-scope">
          <div class="text-center ng-scope" >
            <div class="ng-scope">
              <div class="noTransactions">
                <i class="bticon bticon-cancel-circled" style="color:#fe2617;"></i>
                <h1 class="ng-binding">
                  {{errorMessage}}
                </h1>
                <h2 class="sentence-case ng-binding">
                  <!-- <router-link class="ng-binding" to="/receive">
                    为您的钱包注资
                  </router-link> -->
                </h2>
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

export default {
  name: 'error_message',
  props: ['errorMessage']
}
</script>

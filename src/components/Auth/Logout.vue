<template>
<div class="state-app_setup">
  <div class="loggedoutWrapper ng-scope">
    <div>
      <div class="col-md-6 col-md-offset-3 col-sm-12 col-xs-12 text-center">
        <div class="alert alert-success">
          <h2 class="ng-binding">您已注销。</h2>
        </div>
      </div>
    </div>
    <div>
      <div class="col-md-6 col-md-offset-3 col-sm-12 col-xs-12 text-center">
        <p class="ng-binding">获取 dochain.com 手机钱包 app 即可从任何地方安全地访问您的域链DOC！</p>
        <div class="appstoreimages">

        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'logout',
  created () {
    this.$store.dispatch('logout')
  }
}
</script>

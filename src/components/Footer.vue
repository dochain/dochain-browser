<template>
<footer class="footer ng-scope" v-show="!currentUser">
  <div class="container">
    <div class="row">
      <div class="col-xs-3" style="padding-left: 0;">
        <div class="copyright">
          <div class="copyright-logo"></div>
          <div class="copyright-text">© Copyright DOCHAIN.COM 2016. All Rights Reserved.</div>
        </div>
      </div>
      <div class="col-xs-9 links" style="padding-right: 0;">
        <div class="links-column">
          <div class="links-category ng-binding">开发者</div>
          <ul class="links-list">
            <li class="links-list-item"><a href="https://wallet.dochain.com/" class="ng-binding">应用程序接口</a></li>
          </ul>
          <ul class="links-list">
            <li class="links-list-item">
              反馈
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'footer',
  computed: mapGetters([
    'currentUser'
  ])
}
</script>

<template>
  <div class="appContainer container">
  <component-left-menu></component-left-menu>
  <div class="appRightCol" style="padding-left:0px;">
  <component-balance></component-balance>
  <div class="appBody" id="appBody">
    <!-- uiView: mainView -->
    <div class="appBodyContainer ng-scope" ui-view="mainView">
      <div class="appPage ng-scope">
        <form class="form ng-pristine ng-valid">
          <!-- ngIf: error -->
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <div class="form-group form-group-lg">
                <label class="control-label ng-binding">
                  用户名
                </label>
                <input ng-model="settings.username" type="text" class="form-control ng-pristine ng-untouched ng-valid" :value="currentUser.name">
              </div>
            </div>
            <div class="col-xs-12 col-md-6">
              <div class="form-group form-group-lg">
                <label class="control-label ng-binding">
                  电子邮箱
                </label>
                <input ng-model="settings.email" type="text" class="form-control ng-pristine ng-untouched ng-valid" :value="currentUser.email">
              </div>
            </div>
          </div>

          <hr style="margin: 0px;">
          <div class="form-group form-group-lg" style="display:none;">
            <div class="row">
              <div class="col-xs-12 col-md-6 col-lg-6">
                <label class="control-label ng-binding">
                  头像
                </label>
                <div ng-show="profilePic.saved" class="alert alert-success ng-binding ng-hide">
                  <i class="bticon bticon-ok"></i> 已保存您的头像
                </div>
                <div class="text-center ng-hide" ng-show="profilePic.working">
                  <div class="loading-spinner loading-spinner-">
                    <div class="loading loading-0"></div>
                    <div class="loading loading-1"></div>
                    <div class="loading loading-2"></div>
                  </div>
                </div>
                <div class="media" ng-show="!profilePic.working">
                  <div class="media-left media-middle">
                    <div class="display-token contact-token ng-binding">
                      C
                      <span class="avatar" style="background-image: url(''); background-position-x: 50%; background-position-y: 50%;"></span>
                    </div>
                  </div>
                  <div class="media-body media-middle">
                    <div class="form-group">
                      <input type="file" bt-file-upload="profilePic">
                      <div class="small help-block">
                        <b class="sentence-case ng-binding">允许的文件类型:</b> pdf, jpg, jpeg, bmp, gif, tif, tiff, png.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-6 col-lg-3">
                <label class="control-label sentence-case ng-binding">
                  语言
                </label>
                <div style="margin-top: 15px">
                  <div class="btn-group dropdown" uib-dropdown="">
                    <button type="button" class="btn btn-lg btn-primary ng-binding dropdown-toggle" uib-dropdown-toggle="" aria-haspopup="true" aria-expanded="false">
                      中文 <span class="caret"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr style="margin: 0px;">
          <div class="form-group form-group-lg" style="display:none;">
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <label class="control-label ng-binding">
                  钱包密码
                </label>
                <p style="margin-top: 15px">
                  <a ng-href="" class="sentence-case btn btn-lg btn-default ng-binding" ng-click="changePassword()">
                    更改密码
                  </a>
                </p>
              </div>
            </div>
          </div>
          <hr style="margin-top: 0px; margin-bottom: 20px;">
          <div class="form-group form-group-lg form-group-buttons">
            <button class="btn btn-lg btn-primary ng-binding">
              保存设置
            </button>
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
  computed: mapGetters([
    'currentUser'
  ]),
  created () {
    this.$store.dispatch('changeLeftMenu', 'settings')
  }
}
</script>

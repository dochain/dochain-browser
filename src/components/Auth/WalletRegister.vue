<template>
<div class="state-app_setup container ng-scope">
    <div class="row">
        <div class="col-md-6 col-md-offset-3 col-sm-12 col-xs-12">
            <div class="appWrapper">
                <h1 class="pageTitle ng-binding">创建新钱包</h1>
                <div class="formContainer">
                  <form class="form ng-pristine ng-invalid ng-invalid-required " @submit.prevent="register()">
                    <div ng-if="error" class="alert alert-danger ng-binding ng-scope" v-show="registerErrorMessage">
                        {{registerErrorMessage}}
                    </div>
                    <div class="form-group form-group-lg" :class="{'has-error': (errors.has('password')) }">
                        <label class="control-label ng-binding">密码</label>
                        <div class="password-input">
                            <input
                              @focus="hideAlert"
                              data-vv-as="密码"
                              name="password"
                              v-validate="'required|max:16|min:6'"
                              class="form-control"
                              type="password"
                              placeholder="密码"
                              v-model="data.password"
                            >
                            <div class="help-block ng-scope" v-show="errors.has('password')">
                                <div class="ng-binding ng-scope">{{ errors.first('password') }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group form-group-lg" style="display:none;">
                        <div class="checkbox">
                            <label class="ng-binding">
                                <input type="checkbox" ng-model="termsofservice" class="ng-pristine ng-untouched ng-valid">
                                我同意
                                <a target="_blank" href="#" class="ng-binding">服务条款</a>
                            </label>
                        </div>
                    </div>
                    <div class="form-group form-group-lg form-group-buttons text-center">
                        <button class="btn btn-primary form-control ng-binding">创建新钱包</button>
                    </div>
                  </form>
                </div>
                <div class="smallButtons text-center">
                    <router-link class="sentence-case ng-binding" to="/login">已有钱包？</router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'register',
  data () {
    return {
      data: {
        password: ''
      }
    }
  },
  computed: mapGetters([
    'isLoading',
    'registerErrorMessage'
  ]),
  methods: {
    register () {
      this.$validator.validateAll().then(result => {
        if (result) {
          // 显示loading
          this.$store.dispatch('showLoading')
          this.$store.dispatch('register', this.data)
            .then(() => {
              // 隐藏loading
              this.$store.dispatch('hideLoading')
              alert('钱包创建成功')
              // 页面跳转
              this.$router.push('/login')
            })
            .catch(() => {
              this.$store.dispatch('hideLoading')
            })
        }
      })
    },
    hideAlert () {
      this.$store.dispatch('clearRegisterErrorMessage')
    }
  }
}
</script>

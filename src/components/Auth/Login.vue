<template>
<div class="state-app_setup container ng-scope">
  <div class="row">
    <div class="col-md-6 col-md-offset-3 col-sm-12 col-xs-12">
      <div class="appWrapper">
        <h1 class="pageTitle ng-binding">登录</h1>
        <div class="formContainer">
          <form name="loginForm" class="form ng-pristine ng-invalid ng-invalid-required" @submit.prevent="login()">
            <div ng-if="error" class="alert alert-danger ng-binding ng-scope" v-show="loginErrorMessage">
                {{loginErrorMessage}}
            </div>
            <div class="form-group form-group-lg" :class="{'has-error': (errors.has('email')) }">
              <label class="control-label ng-binding">用户名或电子邮箱</label>
              <input
                @focus="hideAlert"
                data-vv-as="用户名或电子邮箱"
                name="email"
                v-validate="'required'"
                class="form-control"
                type="text"
                placeholder="用户名或电子邮箱"
                v-model="user.email"
              >
              <div class="help-block ng-scope" v-show="errors.has('email')">
                  <div class="ng-binding ng-scope">{{ errors.first('email') }}</div>
              </div>
            </div>
            <div class="form-group form-group-lg" :class="{'has-error': (errors.has('password')) }">
              <label class="control-label ng-binding">密码</label>
              <input
                @focus="hideAlert"
                data-vv-as="密码"
                name="password"
                v-validate="'required|max:16|min:6'"
                class="form-control"
                type="password"
                placeholder="密码"
                v-model="user.password"
              >
              <div class="help-block ng-scope" v-show="errors.has('password')">
                  <div class="ng-binding ng-scope">{{ errors.first('password') }}</div>
              </div>
            </div>
            <div class="form-group form-group-lg form-group-buttons ng-scope" v-show="!isLoading">
                <button type="submit" class="form-control btn btn-primary ng-binding">登录</button>
            </div>
            <div class="ng-binding ng-scope" v-show="isLoading">
                <div class="loading-spinner loading-spinner-">
                    <div class="loading loading-0"></div>
                    <div class="loading loading-1"></div>
                    <div class="loading loading-2"></div>
                </div>
                正在登录
            </div>
          </form>
        </div>
        <div class="smallButtons text-center">
            <router-link class="sentence-case ng-binding" to="/register">创建新账户</router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: mapGetters([
    'isLoading',
    'loginErrorMessage'
  ]),
  methods: {
    login () {
      this.$validator.validateAll().then(result => {
        if (result) {
          // 显示loading
          this.$store.dispatch('showLoading')
          this.$store.dispatch('login', this.user)
            .then(() => {
              // 隐藏loading
              this.$store.dispatch('hideLoading')

              // 页面跳转
              this.$router.push('/wallet')
            })
            .catch(() => {
              this.$store.dispatch('hideLoading')
            })
        }
      })
    },
    hideAlert () {
      this.$store.dispatch('clearLoginerrorMessage')
    }
  }
}
</script>

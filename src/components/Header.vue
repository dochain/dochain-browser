<template>
<nav class="navbar ng-scope">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle">
        <i class="bticon  bticon-arrow-down-circle-o"></i>
      </button>
      <a class="navbar-brand" ng-href="http://browser.dochain.org" target="_self" href="http://browser.dochain.org"><img src="../assets/Dochain-w84b.png"></a>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav pull-right ng-scope" v-if="!currentUser">
        <li v-bind:class="{ active: ($route.path.indexOf('register') !== -1) }">
          <router-link class="ng-binding" to="/register">创建钱包</router-link>
        </li>
        <li v-bind:class="{ active: ($route.path.indexOf('login') !== -1) }">
          <router-link class="ng-binding" to="/login">登录</router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-right ng-scope" v-else>
        <li>
          <router-link class="ng-binding" to="/logout">退出</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'header',
  computed: mapGetters([
    'currentUser'
  ])
}
</script>

<template>
<div class="bodyViewContainer ng-scope">
  <div class="ng-scope">
    <component-header></component-header>
  </div>
  <div class="appWrapper ng-scope">
      <router-view></router-view>
  </div>
  <div class="ng-scope">
    <component-footer></component-footer>
  </div>
</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'app',
  components: {
    'component-header': Header,
    'component-footer': Footer
  },
  created () {
    // this.$socket.on('btc_list', (data) => {
    //   if (data.symbolId === 'btchuobi') {
    //     this.$store.dispatch('changeBalance', data.last)
    //   }
    // })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

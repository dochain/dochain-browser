import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login'
import Logout from '@/components/Auth/Logout'
import Register from '@/components/Auth/Register'
// import Login from '@/components/Auth/WalletLogin'
// import Register from '@/components/Auth/WalletRegister'
import Wallet from '@/components/Wallet/Index'
import Send from '@/components/Wallet/Send'
import Assets from '@/components/Wallet/Assets'
import Transaction from '@/components/Wallet/Transaction'
import Receive from '@/components/Wallet/Receive'
import Contract from '@/components/Wallet/Contract'
import Settings from '@/components/Wallet/Settings'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: Login,
      meta: {
        isNeedAuth: true,
        isVerifyAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isNeedAuth: true,
        isVerifyAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        isNeedAuth: true,
        isVerifyAuth: false
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      meta: {
        isNeedAuth: true,
        isVerifyAuth: true
      }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet,
      meta: {
        isNeedAuth: true,
        isVerifyAuth: true
      }
    },
    {
      path: '/send',
      name: 'send',
      component: Send,
      meta: {
        isNeedAuth: true,
        isVerifyAuth: true
      }
    },
    {
      path: '/assets',
      name: 'assets',
      component: Assets,
      meta: {
        isNeedAuth: true,
        isVerifyAuth: true
      }
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: Transaction,
      meta: {
        isNeedAuth: true,
        isVerifyAuth: true
      }
    },
    {
      path: '/contract',
      name: 'contract',
      component: Contract,
      meta: {
        isNeedAuth: true,
        isVerifyAuth: true
      }
    },
    {
      path: '/receive',
      name: 'receive',
      component: Receive,
      meta: {
        isNeedAuth: true,
        isVerifyAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        isNeedAuth: true,
        isVerifyAuth: true
      }
    }
  ]
})

// 默认路由的钩子
router.beforeEach((to, from, next) => {
  // 判断路由是否需要权限，如果不需要就直接跳转走了
  if (to.matched.some(m => m.meta.isNeedAuth)) {
    store.dispatch('getCurrentUser')
    .then(() => {
      if (to.matched.some(m => m.meta.isVerifyAuth)) {
        console.log(121)
        next()
      } else {
        console.log(131)
        next({path: '/wallet'})
      }
    })
    .catch(() => {
      // 跳转到登录页面
      if (to.matched.some(m => m.meta.isVerifyAuth)) {
        console.log(141)
        next({path: '/login'})
      } else {
        console.log(151)
        next()
      }
    })
  } else {
    next()
  }
})

export default router

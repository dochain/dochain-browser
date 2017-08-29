import { webRequest } from '@/lib/http'

// User的api
const authApi = {
  login (user) {
    return webRequest.post('/user/login', user)
  },
  register (user) {
    return webRequest.post('/user/register', user)
  },
  // login (data) {
  //   return webRequest.post('/wallet/login', data)
  // },
  // register (data) {
  //   return webRequest.post('/wallet/register', data)
  // },
  getUser () {
    return webRequest.get('/user')
  },
  logout () {
    return webRequest.post('/user/logout')
  }
}

export default authApi

import axios from 'axios'

/**
 * 设置web的axios
 */
let webAxios = axios.create({
  baseURL: 'http://wallet.dochain.org/web',
  timeout: 60000,
  validateStatus: (status) => {
    return status >= 200 && status < 300
  },
  responseType: 'json'
})

/**
 * 设置api的axios
 */
let apiAxios = axios.create({
  baseURL: 'http://api.dochain.com/v1',
  timeout: 60000,
  validateStatus: (status) => {
    return status >= 200 && status < 300
  },
  responseType: 'json'
})

/**
 * formatApiResponse
 * 格式Web的返回结果
 */
let formatWebResponse = (promiseObj) => {
  return new Promise((resolve, reject) => {
    promiseObj
      .then((result) => {
        // 判断code信息
        let rebuildResult = result.data
        if (rebuildResult.code !== 0) {
          reject(rebuildResult.data.error_message)
        } else {
          resolve(rebuildResult.data)
        }
      })
      .catch((errorResult) => {
        let errorMessage = ['服务器暂时无法相应您的请求，请稍后再试']
        reject(errorMessage)
      })
  })
}

/**
 * formatApiResponse
 * 格式Api的返回结果
 */
let formatApiResponse = (promiseObj) => {
  return new Promise((resolve, reject) => {
    promiseObj
      .then((result) => {
        // 判断code信息
        let rebuildResult = result.data
        resolve(rebuildResult)
      })
      .catch((errorResult) => {
        let errorMessage = ['服务器暂时无法相应您的请求，请稍后再试']
        reject(errorMessage)
      })
  })
}

/**
 * 设置web请求
 */
export const webRequest = {
  get (url, config) {
    return formatWebResponse(webAxios.get(url, config))
  },
  post (url, data) {
    console.log(data)
    return formatWebResponse(webAxios.post(url, data))
  }
}

/**
 * 设置api请求
 */
export const apiRequest = {
  get (url, config) {
    return formatApiResponse(apiAxios.get(url, config))
  },
  post (url, data) {
    console.log(data)
    return formatApiResponse(apiAxios.post(url, data))
  }
}

export default axios

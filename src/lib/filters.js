import Vue from 'vue'

// 处理千分位
Vue.filter('formatThousands', (value = '0', currencyType = '') => {
  let res
  res = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return res
})

// 处理货币
Vue.filter('formatCurrency', (value = '0', currencyType = '') => {
  let res
  if (value.toString().indexOf('.') === -1) {
    res = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.00'
  } else {
    let prev = value.toString().split('.')[0]
    let next = value.toString().split('.')[1] < 10 ? value.toString().split('.')[1] + '0' : value.toString().split('.')[1]
    res = (prev || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + next
  }
  return currencyType + res
})

// 转换Eth
Vue.filter('conversionEth', (value) => {
  let res = 0
  if (value) {
    res = value / (Math.pow(10, 18))
  }
  return res
})

// 转换GWei
Vue.filter('conversionGWei', (value) => {
  let res = 0
  if (value) {
    res = value / (Math.pow(10, 9))
  }
  return res
})

// 保留小数点(会四舍五入)
Vue.filter('toFixed', (value, pos) => {
  // 小数点不够要用0补齐
  value = parseFloat(value)
  if (!value) {
    return value
  }

  return value.toFixed(pos)
})

Vue.filter('time', (value) => {
  let now
  let oldTime
  let difference
  let result
  let sec = 1000
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  // let halfamonth = day * 15
  let month = day * 30
  let year = month * 12

  now = new Date().getTime()
  oldTime = new Date(value).getTime()
  difference = now - oldTime

  let _year = difference / year
  let _month = difference / month
  let _week = difference / (7 * day)
  let _day = difference / day
  let _hour = difference / hour
  let _min = difference / minute
  let _sec = difference / sec

  if (_year >= 1) {
    result = ~~_year + ' years ago'
  } else if (_month >= 1) {
    result = _month + ' months ago'
  } else if (_week >= 1) {
    result = ~~(_week) + ' weeks ago'
  } else if (_day >= 1) {
    result = _day + ' days ago'
  } else if (_hour >= 1) {
    result = _hour + ' hours ago'
  } else if (_min >= 1) {
    result = ~~(_min) + ' mins ago'
  } else {
    result = ~~(_sec) + ' secs ago'
  }

  return result
})

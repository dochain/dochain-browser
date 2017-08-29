import Accounts from 'ethereumjs-accounts'
import Tx from 'ethereumjs-tx'
import EthUtil from 'ethereumjs-util'
import BigNumber from 'bignumber.js'
import EthAbi from 'ethereumjs-abi'
import file from '@/lib/file'
import store from '@/store'

// TODO 临时增加
const constractMethodSgin = '0xa9059cbb'

// 账号信息
let accounts = new Accounts()
const account = {
  __proto__: accounts,
  // 创建账号
  create (passphrase) {
    return accounts.new(passphrase)
  },
  getDefault () {
    // TODO 注意这里返回列表中的第一个
    let accountList = accounts.get()
    for (var key in accountList) {
      return accountList[key]
    }
  },
  exportFile () {
    // 导出用户信息
    return file.saveText('private', accounts.export(), 'json')
  },
  importFile (content) {
    return new Promise((resolve, reject) => {
      // 导出用户信息
      try {
        let result = accounts.import(content)
        if (typeof result === 'string') {
          resolve(`部分导入成功`)
        } else {
          resolve(`导入成功: ${result} 条`)
        }
      } catch (e) {
        reject('请检查文件内容是否正确')
      }
    })
  }
}

const transaction = {
  // 普通交易
  sign (txParams, confirmPassphraseCall = null) {
    return new Promise((resolve, reject) => {
      try {
        let sign = __sign(txParams, confirmPassphraseCall)
        resolve(sign)
      } catch (e) {
        reject(e)
      }
    })
  },
  // 合约交易
  signContract (txParams, confirmPassphraseCall = null) {
    return new Promise((resolve, reject) => {
      // 生成代码
      let dataEncode = EthAbi.rawEncode([ 'address', 'uint256' ], [ txParams.to, txParams.value ])
      dataEncode = EthUtil.bufferToHex(dataEncode)
      let data = dataEncode.replace(/0x/, constractMethodSgin)

      // 设置to和data
      txParams.to = txParams.constractAddress
      txParams.data = data

      try {
        let sign = __sign(txParams, confirmPassphraseCall)
        resolve(sign)
      } catch (e) {
        reject(e)
      }
    })
  }
}

/**
 * 重新封装底层签名加密
 */
function __sign (txParams, confirmPassphraseCall = null) {
  // 判断是否有回调函数
  if (!confirmPassphraseCall) {
    confirmPassphraseCall = () => {
      let passphrase = prompt('请输入密码', '')
      return passphrase
    }
  }

  // 获取from地址信息
  let fromAccount = account.getDefault()
  let fromAddress = fromAccount.address
  if (txParams.from) {
    fromAddress = txParams.from
  }

  // 获取nonce
  let nonces = store.getters.nonces
  let nonce = nonces[fromAddress]
  if (nonce !== 0 && !nonce) {
    let noncesErr = new Error('Invalid Nonces')
    return noncesErr
  }

  // 获取要转账的账号
  let accountInfo = accounts.get(fromAddress)

  // 判断是否需要解锁密码
  if (accountInfo.encrypted) {
    accountInfo = accounts.get(fromAddress, confirmPassphraseCall())
  }

  // 如果没有解锁直接报异常
  if (accountInfo.locked) {
    let lockedErr = new Error('Cannot sign transaction. Account locked!')
    return lockedErr
  }

  // 使用Buffer将密钥生成16进制
  console.log('private')
  console.log(accountInfo.private)
  let privateKey = new Buffer(accountInfo.private, 'hex')

  // 设置nonce
  txParams.nonce = __convertsHex(nonce + 1)

  // 设置gasPrice
  txParams.gasPrice = '0x09184e72a000'

  // 设置gasLimit
  // let gasLimit = 160255
  // if (txParams.gasLimit) {
    // gasLimit = txParams.gasLimit
  // }
  // txParams.gasLimit = __convertsHex(gasLimit)
  txParams.gasLimit = '0x2710ff'

  // 重新设置value
  txParams.value = __toWeiAndHex(txParams.value)

  // 设置data
  if (!txParams.data) {
    txParams.data = ''
  }

  // 去掉没有用的属性
  delete txParams.from

  txParams.nonce = '0x07'
  // txParams.gasLimit = '0x2710ff'
  // txParams.value = '0x00'

  // 生成交易签名
  // txParams = {
  //   nonce: '0x07',
  //   gasPrice: '0x09184e72a000',
  //   gasLimit: '0x2710ff',
  //   to: '0xf93c03cba2ccee67d56dd378d7071d8e7aff0480',
  //   value: '0x00',
  //   data: ''
  // }
  let tx = new Tx(txParams)
  tx.sign(privateKey)

  // 拼接私钥
  return '0x' + tx.serialize().toString('hex')
}

/**
 * 转化16进制
 */
function __convertsHex (value) {
  return EthUtil.bufferToHex(EthUtil.toBuffer(value))
}

/**
 * 将eth转化成wei
 */
function __toWeiAndHex (value) {
  let numObj = new BigNumber(value)
  return `0x${numObj.times(Math.pow(10, 18)).toString(16)}`
}

export default {
  transaction,
  account
}

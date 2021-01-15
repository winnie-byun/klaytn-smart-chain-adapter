const web3 = require('web3')
const Caver = require('caver-js')
const { Requester, Validator } = require('@chainlink/external-adapter')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
//   rpc  - http://localhost:8551/

const privateKey = process.env.PRIVATE_KEY
keystore = fs.readFileSync('keystore.json', 'utf8')
const keyring = caver.wallet.keyring.decrypt(keystore, privateKey)
caver.wallet.add(keyring)

const sendFulfillment = async (address, dataPrefix, functionSelector, value) => {
  const dataPrefixBz = web3.utils.hexToBytes(dataPrefix)
  const functionSelectorBz = web3.utils.hexToBytes(functionSelector)
  const valueBz = web3.utils.hexToBytes(value)
  const data = functionSelectorBz.concat(dataPrefixBz, valueBz)

  let tx = new caver.transaction.legacyTransaction({
    from: keyring.toAccount()._address,
    to: address,
    input: web3.utils.bytesToHex(data),
    gas: 1500000,
  })

  return caver.wallet.sign(keyring.address, tx)
    .then(caver.rpc.klay.sendRawTransaction)
    .then(console.log)
}

const customParams = {
  // Use two sets of possible keys in case the node operator
  // is using a non-EI initiator where the primary keys are reserved.
  address: ['address', 'bscAddress'],
  dataPrefix: ['dataPrefix', 'bscDataPrefix'],
  functionSelector: ['functionSelector', 'bscFunctionSelector'],
  value: ['result', 'value']
}

const createRequest = (input, callback) => {
  const validator = new Validator(callback, input, customParams)
  const jobRunID = validator.validated.id
  const address = validator.validated.data.address
  const dataPrefix = validator.validated.data.dataPrefix
  const functionSelector = validator.validated.data.functionSelector
  const value = validator.validated.data.value

  const _handleResponse = tx => {
    const response = {
      data: { result: tx.hash },
      result: tx.hash,
      status: 200
    }
    callback(response.status, Requester.success(jobRunID, response))
  }

  const _handleError = err => {
    callback(500, Requester.errored(jobRunID, err))
  }

  sendFulfillment(address, dataPrefix, functionSelector, value)
    .then(_handleResponse)
    .catch(_handleError)
}

module.exports = { createRequest: createRequest }

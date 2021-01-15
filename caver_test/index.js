const fs = require('fs')
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
// public EN - https://api.baobab.klaytn.net:8651/'
// local  - http://localhost:8551
const tx = require('./send_tx')
const contract = require('./contract')
const PRIVATE_KEY = '1234!@#$qwer'

const main = () => {
  // Wallet setting
  keystore = fs.readFileSync('keystore.json', 'utf8')
  const keyring = caver.wallet.keyring.decrypt(keystore, PRIVATE_KEY)
  caver.wallet.add(keyring)

  // predefined functions
  let funcs = {
    "send": tx.sendTx,
    "deploy": contract.deploy,
    "callRaw": contract.callRaw,
    "call": contract.call,
  }

  // Get argument from cmd
  var f = process.argv.slice(2)[0];
  if (funcs[f] == undefined) { // check if argument valid
    console.log("Please insert one of : ", Object.keys(funcs))
    return
  }

  // run function
  funcs[f](caver, keyring)
    .catch(err => { console.log(err) })
}

main()

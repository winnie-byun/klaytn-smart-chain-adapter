const fs = require('fs')
// const solc = require('solc');
const contract_PATH = "./timestamp/"
const file_name = "Times"

// const input = fs.readFileSync(contract_PATH + "timestamp.sol");
// const output = solc.compile(input.toString(), 1);
// const bytecode = output.contracts['Token'].bytecode;
// const abi = JSON.parse(output.contracts['Token'].interface);

// go to http://remix.ethereum.org/ for ABI and bytecodes

// TODO - Check this for API converting : https://gist.github.com/tomconte/6ce22128b15ba36bb3d7585d5180fba0
exports.deploy = async (caver, keyring) => {
  let contract = new caver.contract(JSON.parse(fs.readFileSync(contract_PATH + file_name + ".json")))
  contract.deploy({
    data: fs.readFileSync(contract_PATH + file_name + ".bin"),
  }).send({
    from: keyring.toAccount()._address,
    gas: 1500000,
    value: 0,
  }, function (error, transactionHash) { }
  ).then(function (newContractInstance) {
    console.log("contract address :", newContractInstance.options.address) // instance with the new contract address
    fs.writeFileSync(contract_PATH + "contract_address-" + file_name + ".bin", newContractInstance.options.address)
  })
}

exports.call = async (caver, keyring) => {
  let contract = new caver.contract(
    JSON.parse(fs.readFileSync(contract_PATH + file_name + ".json")),
    fs.readFileSync(contract_PATH + "contract_address-" + file_name + ".bin").toString(),
  )

  // Make time for `setTime`
  var today = new Date();
  var time = "" + today.getHours() + 0 + today.getMinutes() + 0 + today.getSeconds();

  // functions for contract
  let funcs = {
    "setTime": contract.methods.setTime(time).send,
    "getTime": contract.methods.getTime().call,
    "getLastTime": contract.methods.getLastTime().call,
  }

  // Get argument from cmd
  method = process.argv.slice(2)[1]
  if (funcs[method] == undefined) { // check if argument valid
    console.log("Please insert one of : ", Object.keys(funcs))
    return
  }

  // call function
  funcs[method]({
    from: keyring.toAccount()._address,
    gas: 1500000,
    value: 0,
  }).then(console.log)
}

exports.callRaw = async (caver, keyring) => {
  let contract = new caver.contract(
    JSON.parse(fs.readFileSync(contract_PATH + file_name + ".json")),
    fs.readFileSync(contract_PATH + "contract_address-" + file_name + ".bin").toString(),
  )

  // Make time for `setTime`
  var today = new Date();
  var time = "" + today.getHours() + 0 + today.getMinutes() + 0 + today.getSeconds();

  // functions for contract
  let funcs = {
    "setTime": contract.methods.setTime(time).encodeABI(),
    "getTime": contract.methods.getTime().encodeABI(),
    "getLastTime": contract.methods.getTime().encodeABI(),
  }

  // Get argument from cmd
  let method = process.argv.slice(2)[1]
  if (funcs[method] == undefined) { // check if argument valid
    console.log("Please insert one of : ", Object.keys(funcs))
    return
  }

  let tx = new caver.transaction.legacyTransaction({
    from: keyring.toAccount()._address,
    to: contract.options.address,
    input: funcs[method],
    gas: 1500000,
  })

  // call function
  caver.wallet.sign(keyring.address, tx)
    .then(caver.rpc.klay.sendRawTransaction)
    .then(console.log)
}

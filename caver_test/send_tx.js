exports.sendTx = async (caver, keyring) => {
  const vt = new caver.transaction.valueTransfer({
    from: keyring.address,
    to: '0xb03e2cbF60cFa2C37F1CCED1bDa503E45F47ac10',
    value: 1,
    gas: 25000,
  })
  await caver.wallet.sign(keyring.address, vt)
    .then(signed => {
      caver.rpc.klay.sendRawTransaction(signed)
        .then(console.log)
    })
}

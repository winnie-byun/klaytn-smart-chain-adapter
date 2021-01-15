# Pre-requisite
1. Go to https://baobab.wallet.klaytn.com/create for a new account.
2. Set your key in `PRIVATE_KEY` in `index.js` and store `keystore.json` in current directory.

# Deploy Contract
```
node index.js deploy
```
Deployed contract address is stored in `./timestamp/contract_address-Times.bin`

# Run Contract
To send and call contract :
```
node index.js call setTime
node index.js call getTime
```
To send and call contract using raw transaction :
```
node index.js callRaw setTime
node index.js callRaw getTime
```
# Value Transfer
```
node index.js send
```
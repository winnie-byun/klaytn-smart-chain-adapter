# Chainlink External Adapter for Klaytn Smart Chain

This adapter is built to fulfill Klaytn oracle requests.

## How to Run

1. Go to https://baobab.wallet.klaytn.com/create for a new account.
2. Set your key in `PRIVATE_KEY` in `server.sh` and store `keystore.json` in current directory.
3. To depoly a contract, run  `cd caver_test && node index.js deploy`.
4. To run server, run `./server.sh`.
5. To request `./request-getTime.sh` or `./request-setTime.sh`.

## Input Params

- `address` or `bscAddress`: The oracle contract to fulfill the request on
- `dataPrefix` or `dataPrefix`: The data prefix in the request
- `functionSelector` or `bscFunctionSelector`: The fulfillment function selector
- `result` or `value`: The value to fulfill the request with

## Output

```json
{
    "jobRunID": "test123",
    "data": {
        "result": "0x560d6081e276e1c3c1e58aba722ab2848315442a196fcc89a13baa8bc7e34a78"
    },
    "result": "0x560d6081e276e1c3c1e58aba722ab2848315442a196fcc89a13baa8bc7e34a78",
    "statusCode": 200
}
```

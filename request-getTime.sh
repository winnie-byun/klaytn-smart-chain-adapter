curl --location --request POST 'http://localhost:8080/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "address": "0x57cefc59ae8e882d9a0334831d59778611c32f2b",
    "functionSelector": "557ed1ba",
    "dataPrefix": "0x",
    "value": "0x"
}'

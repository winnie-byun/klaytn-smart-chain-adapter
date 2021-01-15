curl --location --request POST 'http://localhost:8080/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "address": "0x57cefc59ae8e882d9a0334831d59778611c32f2b",
    "functionSelector": "0x3beb26c4",
    "dataPrefix": "0x000000000000000000000000000000000000000000000000000000000",
    "value": "0x187fe1"
}'

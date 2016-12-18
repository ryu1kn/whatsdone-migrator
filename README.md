
# whatsdone-migrator

```sh
$ node migrate --config config.json
```

```json
{
    "from-mongodb": {
        "connection": "mongodb://CONNECTION_STRING"
    },
    "to-dynamodb": {
        "region": "",
        "tableName": ""
    },
    "replace-fields": {
        "userId": [
            ["FROM_VALUE", "TO_VALUE"],
            ["FROM_VALUE", "TO_VALUE"]
        ]
    }
}
```


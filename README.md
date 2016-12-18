
# whatsdone-migrator

```sh
$ node migrate-db --config config.json
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
        "userId": {
            "FROM_VALUE_1": "TO_VALUE_1",
            "FROM_VALUE_2": "TO_VALUE_2"
        }
    }
}
```



'use strict';

const DynamoDBWriteStream = require('./dynamodb-write-stream');

class DynamoRepo {

    constructor(params) {
        this._docClient = params.docClient;
        this._tableName = params.tableName;
    }

    provideWriteStream() {
        return new DynamoDBWriteStream({
            docClient: this._docClient,
            tableName: this._tableName
        });
    }

}

module.exports = DynamoRepo;

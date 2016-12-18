
'use strict';

const DynamoDBWriteStream = require('./dynamodb-write-stream');

class DynamoRepo {

    constructor(params) {
        this._docClient = params.docClient;
        this._generateUuid = params.generateUuid;
        this._tableName = params.tableName;
    }

    provideWriteStream() {
        return new DynamoDBWriteStream({
            docClient: this._docClient,
            generateUuid: this._generateUuid,
            tableName: this._tableName
        });
    }

}

module.exports = DynamoRepo;

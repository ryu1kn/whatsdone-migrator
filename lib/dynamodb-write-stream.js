
'use strict';

const Writable = require('stream').Writable;

const MAX_ONETIME_PUT = 25;

class DynamoDBWriteStream extends Writable {

    constructor(params) {
        super({objectMode: true});
        this._docClient = params.docClient;
        this._tableName = params.tableName;
    }

    _write(item, _encoding, callback) {
        const params = {
            TableName: this._tableName,
            Item: item
        };
        this._docClient.put(params, callback);
    }

    _writev(items, callback) {
        const requests = this._getPutRequests(items.map(item => item.chunk));
        return this._uploadItems(requests)
            .then(
                result => callback(null, result),
                e => callback(e)
            );
    }

    _uploadItems(items) {
        const firstItems = items.slice(0, MAX_ONETIME_PUT);
        const restItems = items.slice(MAX_ONETIME_PUT);
        return this._docClient.batchWrite(this._getRequestParams(firstItems)).promise()
            .then(data => {
                const retryItems = data.UnprocessedItems[this._tableName] || [];
                const nextItems = retryItems.concat(restItems);
                return nextItems.length > 0 ? this._uploadItems(nextItems) : [];
            });
    }

    _getRequestParams(requests) {
        return {
            RequestItems: {[this._tableName]: requests}
        };
    }

    _getPutRequests(items) {
        return items.map(item => (
            {
                PutRequest: {Item: item}
            }
        ));
    }

}

module.exports = DynamoDBWriteStream;


'use strict';

const Uuid = require('uuid');
const DoneItemTransformStream = require('./done-item-transform-stream');
const DynamoDBRepo = require('./dynamodb-repo');
const MongoClient = require('mongodb').MongoClient;
const MongoDBRepo = require('./mongodb-repo');

class Context {

    constructor(params) {
        this._mongoConnectionString = mongoConnectionString;
    }

    getDynamoDBRepo() {
        this._dynamoDBRepo = this._dynamoDBRepo || this._createDynamoDBRepo();
        return this._dynamoDBRepo;
    }

    _createDynamoDBRepo() {
        return new DynamoDBRepo({
            docClient: new AWS.DynamoDB.DocumentClient(),
            generateUuid: () => Uuid.v4,
            tableName: 'whatsdone-dones'
        });
    }

    _createMongoDBRepo() {
        return new MongoDBRepo({
            collectionName: 'dones',
            connectionString: this._mongoConnectionString,
            mongoClient: MongoClient,
        });
    }

    _createDoneItemTransformStream() {
        return new DoneItemTransformStream({
            userIdMap:
        });
    }

}

module.exports = Context;

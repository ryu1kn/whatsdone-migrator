
'use strict';

const AWS = require('aws-sdk');
const Uuid = require('uuid');
const DoneItemTransformStream = require('./done-item-transform-stream');
const DynamoDBRepo = require('./dynamodb-repo');
const MongoClient = require('mongodb').MongoClient;
const MongoDBRepo = require('./mongodb-repo');

class Context {

    constructor(params) {
        this._mongoConnectionString = params.mongoConnectionString;
        this._mongoCollectionName = params.mongoCollectionName;
        this._dynamoRegion = params.dynamoRegion;
        this._dynamoTableName = params.dynamoTableName;
        this._userIdMap = params.userIdMap;
    }

    getDynamoDBRepo() {
        return new DynamoDBRepo({
            docClient: new AWS.DynamoDB.DocumentClient({region: this._dynamoRegion}),
            tableName: this._dynamoTableName
        });
    }

    getMongoDBRepo() {
        return new MongoDBRepo({
            collectionName: this._mongoCollectionName,
            connectionString: this._mongoConnectionString,
            mongoClient: MongoClient
        });
    }

    getDoneItemTransformStream() {
        return new DoneItemTransformStream({
            generateUuid: () => Uuid.v4(),
            userIdMap: this._userIdMap
        });
    }

}

module.exports = Context;

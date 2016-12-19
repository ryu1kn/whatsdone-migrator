
'use strict';

class MongoDBRepo {

    constructor(params) {
        this._collectionName = params.collectionName;
        this._connectionString = params.connectionString;
        this._mongoClient = params.mongoClient;
    }

    getAllAsStream() {
        return this._find().then(cursor => cursor.stream());
    }

    _find(query, fields) {
        return this._getCollection().then(collection => collection.find(query, fields));
    }

    _getCollection() {
        if (this._collection) return Promise.resolve(this._collection);

        return this._getDB().then(db => {
            this._collection = db.collection(this._collectionName);
            return this._collection;
        });
    }

    _getDB() {
        if (this._db) return Promise.resolve(this._db);

        return new Promise((resolve, reject) => {
            this._mongoClient.connect(this._connectionString, (err, db) => {
                if (err) {
                    reject(err);
                } else {
                    this._db = db;
                    resolve(db);
                }
            });
        });
    }

    closeConnection() {
        return this._getDB().then(db => {
            db.close();
        });
    }

}

module.exports = MongoDBRepo;

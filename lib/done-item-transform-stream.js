
'use strict';

const Transform = require('stream').Transform;

class DoneItemTransformStream extends Transform {

    constructor(params) {
        super({objectMode: true});

        this._userIdMap = params.userIdMap;
    }

    _transform(doneItem, encoding, callback) {
        try {
            callback(null, this._transformDoneItem(doneItem));
        } catch (e) {
            callback(e);
        }
    }

    _transformDoneItem(doneItem) {
        return Object.keys(doneItem).reduce((memo, key) => {
            if (key === '_id') return memo;
            if (key === 'userId' && !doneItem.userId) return memo;
            return Object.assign({}, memo, {userId: this._userIdMap[doneItem.userId]});
        }, {});
    }

}

module.exports = DoneItemTransformStream;

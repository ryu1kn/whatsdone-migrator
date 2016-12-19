
'use strict';

const Transform = require('stream').Transform;

class DoneItemTransformStream extends Transform {

    constructor(params) {
        super({objectMode: true});

        this._userIdMap = params.userIdMap;
        this._generateUuid = params.generateUuid;
    }

    _transform(doneItem, encoding, callback) {
        try {
            callback(null, this._transformDoneItem(doneItem));
        } catch (e) {
            callback(e);
        }
    }

    _transformDoneItem(doneItem) {
        const newItem = Object.keys(doneItem).reduce((memo, key) => {
            const newValue = this._getNewAttrValue(key, doneItem[key]);
            return typeof newValue === 'undefined' ? memo : Object.assign(memo, {[key]: newValue});
        }, {});
        return Object.assign(newItem, {id: this._generateUuid()});
    }

    _getNewAttrValue(attrName, attrValue) {
        switch (attrName) {
        case '_id': return;
        case 'userId': return this._userIdMap[attrValue];
        case 'date': return new Date(attrValue).toISOString();
        default: return attrValue;
        }
    }

}

module.exports = DoneItemTransformStream;

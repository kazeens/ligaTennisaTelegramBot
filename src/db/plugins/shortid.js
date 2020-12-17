'use strict';

let shortid = require('shortid');

module.exports = function shortIdPlugin(schema) {
    schema.add({ _id: 'string' });
    schema.pre('save', function generateId(next) {
        if (!this._id) {
            this._id = shortid.generate();
        }

        next();
    });
    schema.pre('insertMany', (next, documents) => {
        documents.forEach((doc) => {
            let newDoc = doc;

            if (!newDoc._id) {
                newDoc._id = shortid.generate();
            }

            return newDoc;
        });

        next();
    });
};

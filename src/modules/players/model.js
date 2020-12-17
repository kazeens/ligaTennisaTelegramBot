'use strict';

const mongoose = require('mongoose');
const db = require('src/db');
const { revertId } = require('src/utils/mongo.helper');

const modelName = 'Players';
const collectionName = 'players';


const  mongooseSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        telegramUsername: { type: String },
        isAdmin: { type: Boolean }
    },
    {
        versionKey: 'version',
        toJSON: {
            transform(doc, ret) {
                revertId(ret);
            },
        },
    }
);

// mongooseSchema.index({ firstName: 1, name: 1 }, { unique: true });

const Tournaments = db.model(modelName, mongooseSchema, collectionName);

module.exports = Tournaments;

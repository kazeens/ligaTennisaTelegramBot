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
        telegramId: { type: Number },
        isAdmin: { type: Boolean, default: false }
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

const Player = db.model(modelName, mongooseSchema, collectionName);

module.exports = Player;

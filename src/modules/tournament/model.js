'use strict';

const mongoose = require('mongoose');
const db = require('src/db');
const { revertId } = require('src/utils/mongo.helper');

const modelName = 'Tournament';
const collectionName = 'tournaments';

const mongooseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        number: { type: String, required: true },
        description: { type: String },
        participants: { type: Array, default: [] },
        gridLimit: { type: Number },
        startDate: { type: Date, required: true },
        endDate:  { type: Date, required: true },
        topicId: { type: Number },
        isCancelled: { type: Boolean, default: false },
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

mongooseSchema.index({name: 1, number: 1, 'participants.id': 1}, { unique: true });

const Tournament = db.model(modelName, mongooseSchema, collectionName);

module.exports = Tournament;

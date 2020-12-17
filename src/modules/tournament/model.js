'use strict';

const mongoose = require('mongoose');
const db = require('src/db');
const { revertId } = require('src/utils/mongo.helper');

const modelName = 'Tournaments';
const collectionName = 'tournaments';

const dateSchema = new mongoose.Schema({
  start: { type: Date, required: true },
  end:  { type: Date, required: true },
});

const  mongooseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        gridLimit: Number,
        dates: {
          type: dateSchema,
          default: {},
        },
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

mongooseSchema.index({ intermediaryId: 1, name: 1 }, { unique: true });

const Tournaments = db.model(modelName, mongooseSchema, collectionName);

module.exports = Tournaments;

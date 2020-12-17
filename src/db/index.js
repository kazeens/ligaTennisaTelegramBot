'use strict';

const mongoose = require('mongoose');
const mongooseParanoidPlugin = require('mongoose-paranoid-plugin');
const winston = require('winston');

const { database: { mongodb: mongoDbConfig }} = require('src/config');

const shortIdPlugin = require('src/db/plugins/shortid');
const mongooseTimestamps = require('src/db/plugins/mongoose-timestamps');

const { getMongoConnectionString } = require('src/config/utils');

const db =  (function () {
    const connectionString = getMongoConnectionString(mongoDbConfig);
    winston.log('connectionString', connectionString)
    const odm = mongoose.createConnection(connectionString);

    mongoose.connection.on('error', (err) => {
        winston.info('Mongoose level error');
        winston.error(err);
    });

    odm.on('connecting', () => winston.info(`MongoDB connecting to ${odm.host}:${odm.port}`));

    odm.on('error', (err) => {
      winston.error(err);
    });

    odm.on('close', (err) => {
        winston.info('MongoDB connection closed');
        winston.error(err);
    });

    odm.on('connected', () => winston.info(`MongoDB connected successfully to ${odm.host}:${odm.port}`));

    odm.once('open', () => winston.info(`MongoDB opened successfully on ${odm.host}:${odm.port}`));

    odm.on('reconnected', () => winston.info(`MongoDB reconnected to ${odm.host}:${odm.port}.`));

    odm.on('timeout', () => winston.warn(`MongoDB timeout on ${odm.host}:${odm.port}.`));

    odm.on('disconnected', () => winston.warn(`MongoDB connection lost to ${odm.host}:${odm.port}.`));

    // apply global plugins
    mongoose.plugin(shortIdPlugin);
    mongoose.plugin(mongooseTimestamps);
    mongoose.plugin(mongooseParanoidPlugin, { field: 'deletedAt' });

    return odm;
})();

module.exports = db;
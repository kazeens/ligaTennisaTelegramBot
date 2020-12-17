'use strict';

const mongoose = require('mongoose');
const mongooseParanoidPlugin = require('mongoose-paranoid-plugin');
const logger = require('src/utils/logger');

const { database: { mongodb: mongoDbConfig }} = require('src/config');

const shortIdPlugin = require('src/db/plugins/shortid');
const mongooseTimestamps = require('src/db/plugins/mongoose-timestamps');

const { getMongoConnectionString } = require('src/config/utils');

const db =  (function () {
    const connectionString = getMongoConnectionString(mongoDbConfig);
    logger.log('connectionString', connectionString)
    const odm = mongoose.createConnection(connectionString);

    mongoose.connection.on('error', (err) => {
        logger.info('Mongoose level error');
        logger.error(err);
    });

    odm.on('connecting', () => logger.info(`MongoDB connecting to ${odm.host}:${odm.port}`));

    odm.on('error', (err) => {
      logger.error(err);
    });

    odm.on('close', (err) => {
        logger.info('MongoDB connection closed');
        logger.error(err);
    });

    odm.on('connected', () => logger.info(`MongoDB connected successfully to ${odm.host}:${odm.port}`));

    odm.once('open', () => logger.info(`MongoDB opened successfully on ${odm.host}:${odm.port}`));

    odm.on('reconnected', () => logger.info(`MongoDB reconnected to ${odm.host}:${odm.port}.`));

    odm.on('timeout', () => logger.warn(`MongoDB timeout on ${odm.host}:${odm.port}.`));

    odm.on('disconnected', () => logger.warn(`MongoDB connection lost to ${odm.host}:${odm.port}.`));

    // apply global plugins
    mongoose.plugin(shortIdPlugin);
    mongoose.plugin(mongooseTimestamps);
    mongoose.plugin(mongooseParanoidPlugin, { field: 'deletedAt' });

    return odm;
})();

module.exports = db;
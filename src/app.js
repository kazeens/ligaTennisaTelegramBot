
require('./config/paths').init();

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const telegramBotClient = require('src/clients/telegram-bot');
const winston = require('src/utils/logger')

const config = require('src/config');
const jobs = require('src/jobs/vk'); // rethig in the future the structure
const app = express();

app.use(helmet());
app.use(express.static('src/static'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

telegramBotClient.configure();
jobs.init();

app.listen(config.port, () => {

  let nowStr = new Date()
  .toISOString()
  .substr(0, 19)
  .replace(/T/, ' at ');

  winston.info('*********************************************************');
  winston.info('Liga tennisa bot');
  winston.info(`Server is up, listening on port ${config.port}`);
  winston.info(`Started on ${nowStr} UTC`);
  winston.info('*********************************************************');
});

/**
 * To do
 * 1. Normal logger
 */

module.exports = app;

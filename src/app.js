
require('./config/paths').init();

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const telegramBot = require('src/clients/telegram-bot');
const logger = require('src/utils/logger')

const config = require('src/config');
const jobs = require('src/jobs/vk'); // rethig in the future the structure
const app = express();

app.use(helmet());
app.use(express.static('src/static'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

telegramBot.configure();
jobs.init();

app.listen(config.port, () => {

  let nowStr = new Date()
  .toISOString()
  .substr(0, 19)
  .replace(/T/, ' at ');

  logger.info('*********************************************************');
  logger.info('Liga tennisa bot');
  logger.info(`Server is up, listening on port ${config.port}`);
  logger.info(`Started on ${nowStr} UTC`);
  logger.info('*********************************************************');
});

module.exports = app;

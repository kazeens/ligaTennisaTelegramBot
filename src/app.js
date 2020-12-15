
const config = require('./config');

require('./lib/telegram-bot');

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(config.port, () => {

  let nowStr = new Date()
  .toISOString()
  .substr(0, 19)
  .replace(/T/, ' at ');

  console.log('*********************************************************');
  console.log('Liga tennis bot');
  console.log(`Server is up, listening on port ${config.port}`);
  console.log(`Started on ${nowStr} UTC`);
  console.log('*********************************************************');
});

module.exports = app;

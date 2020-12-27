
const winston = require('winston');
const { getMongoConnectionString } = require('src/config/utils');

const { combine, colorize, printf } = winston.format;


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        printf(({ level, message }) => {
          return message;
        }),
      ),
    }),
  ],
});

global.logger = logger;

module.exports = logger;
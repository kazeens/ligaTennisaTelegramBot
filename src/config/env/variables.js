
const { getEnvVariable } = require('./variables.helpers');

module.exports = {
  telegramBotToken: getEnvVariable('TELEGRAM_BOT_TOKEN'),
  vk: {
    token: getEnvVariable('VK_TOKEN'),
    groupId: getEnvVariable('VK_GROUP_ID', 'number'),
  },
  protocol: getEnvVariable('PROTOCOL'),
  env: getEnvVariable('NODE_ENV'),
  host: getEnvVariable('HOST'),
  database: {
    mongodb: {
        host: getEnvVariable('MONGODB_HOST'),
        port: getEnvVariable('MONGODB_PORT'),
        sslEnabled: getEnvVariable('SSL_ENABLED', 'boolean'),
        auth: false,
        user: null,
        password: null,
        dbName: getEnvVariable('DB_NAME'),
        replication: {
            enabled: false,
        },
    },
  },
}
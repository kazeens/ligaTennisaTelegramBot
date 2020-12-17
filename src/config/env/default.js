'use strict';

module.exports = {
  telegramBotToken: '1450613929:AAH7M2EXd0voUTsVhR1XzBI0NK4GydNy_4s',
  vk: {
    token: '627a1656faf4361d334f65bfde66e2cfbb7a0593e95c80865eb410cd12d0b933608e443abbc10fbce2815',
    groupId: 201187763
  },
  protocol: 'http',
  env: 'development',
  host: 'localhost',
  port: 3000,
  database: {
    mongodb: {
        host: 'mongodb',
        port: 27017,
        sslEnabled: false,
        auth: false,
        user: null,
        password: null,
        dbName: 'liga_tennisa_development',
        replication: {
            enabled: false,
        },
    },
  },
};

const _ = require('lodash');

const { replyTypes } = require('src/clients/telegram-bot/constants');

module.exports = {
  getMessageType,
}

function getMessageType(message) {
  const [ messageEntity = {} ] = _.get(message, 'entities', []);

  if(messageEntity.type === replyTypes.botCommand) {
    return replyTypes.botCommand;
  }

  if(message.text) {
    return replyTypes.text;
  }

  return replyTypes.unknown;
}
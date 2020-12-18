

const replyTypes = {
  botCommand: 'bot_command',
  text: 'text',
  unknown: 'unknown'
};

const propertyByReplyType = {
  [replyTypes.botCommand]: 'text', 
  [replyTypes.text]: 'text', 
};

const allowedReplyTypes = [
  replyTypes.botCommand,
  replyTypes.text,
];

const telegraf = {
    sessionSetup: {
      sessionCollectionName: 'sessions',
      sessionPropertyName: 'session',
    },
};

module.exports = {
  replyTypes,
  allowedReplyTypes,
  telegraf,
}
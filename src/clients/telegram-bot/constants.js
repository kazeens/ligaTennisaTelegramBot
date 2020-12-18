
const replyTypes = {
  botCommand: 'bot_command',
  text: 'text',
  unknown: 'unknown' // Remove
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

const commands = {
  HELP: 'help',
  TOURNAMENTS: 'tournaments',
  SIGN_UP: 'signUp',
  SIGN_UP_EDIT: 'signUpEdit',
  SUBSCRIBE_SCHEDULE: 'subscribeSchedule',
  UNSUBSCRIBE_SCHEDULE: 'unsubscribeSchedule',
  SEE_RESULTS: 'seeResults',
  REPORT_RESULTS: 'reportResults',
}

module.exports = {
  replyTypes,
  allowedReplyTypes,
  propertyByReplyType,
  telegraf,
  commands,
}
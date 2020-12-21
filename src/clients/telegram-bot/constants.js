
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
  PLAY_TOURNAMENT: 'play_tournament',
  EXIT_TOURNAMENT: 'exit_tournament',
  SIGN_UP: 'sign_up',
  SIGN_UP_EDIT: 'sign_up_edit',
  SUBSCRIBE_SCHEDULE: 'subscribe_schedule',
  UNSUBSCRIBE_SCHEDULE: 'unsubscribe_schedule',
  SEE_RESULTS: 'seeResults', // Под вопросом
  REPORT_RESULTS: 'report_results',
}

const tournamentDateLabelFormat = 'Do MMMM (dddd)';
const tournamentDayLableFormat = 'dddd'

module.exports = {
  replyTypes,
  allowedReplyTypes,
  propertyByReplyType,
  telegraf,
  commands,
  tournamentDateLabelFormat,
  tournamentDayLableFormat,
}
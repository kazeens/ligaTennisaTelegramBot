const { Telegraf } = require('telegraf');
const { TelegrafMongoSession } = require('telegraf-session-mongodb');

const db = require('src/db');
const config = require('src/config');
const commandsHandler = require('src/clients/telegram-bot/handlers/command');
const textHandler = require('src/clients/telegram-bot/handlers/text');

const mv = require('src/clients/telegram-bot/middlewares');
const { 
  telegraf, commands,
  replyTypes,
} = require('src/clients/telegram-bot/constants');

const commandsHandlersMap = {
  [commands.HELP]: commandsHandler.handleHelpMessage,
  [commands.TOURNAMENTS]: commandsHandler.handleTournaments,
  [commands.PLAY_TOURNAMENT]: commandsHandler.handlePlayTournament,
  [commands.EXIT_TOURNAMENT]: commandsHandler.handleExitTournament,
  [commands.SIGN_UP]: commandsHandler.handleSignUp,
  [commands.SIGN_UP_EDIT]: commandsHandler.handleSignUpEdit,
  [commands.SUBSCRIBE_SCHEDULE]: commandsHandler.handleScheduleSubscription,
  [commands.UNSUBSCRIBE_SCHEDULE]: commandsHandler.handleScheduleUnsubscription,
  [commands.REPORT_RESULTS]: commandsHandler.handleMatchReporting,
}

function configureTelegramBot() {
  const bot = new Telegraf(config.telegramBotToken);
  const session = new TelegrafMongoSession(db, telegraf.sessionSetup);

  bot.use((...args) => session.middleware(...args));
  bot.use(mv.playerIdentificationMiddleware);
  bot.use(mv.clearPreviousCommandMessageHistoryStack);
  bot.use(mv.manageReplyHistoryStack);

  bot.start(commandsHandler.handleStartMessage);

  registerCommandsHandlers(bot);

  bot.use(mv.catchInvalidCommandMiddleware);
  bot.use(mv.textValidationMiddleware);

  bot.on(replyTypes.text, textHandler.handleTextInput);

  bot.launch();
}

function registerCommandsHandlers(bot) {
  Object.keys(commandsHandlersMap)
    .forEach(command => bot.command(command, commandsHandlersMap[command]))
}

module.exports.configure = configureTelegramBot;


const { Telegraf } = require('telegraf');
const { TelegrafMongoSession } = require('telegraf-session-mongodb');

const db = require('src/db');
const config = require('src/config');
const controller = require('src/clients/telegram-bot/controller');
const mv = require('src/clients/telegram-bot/middlewares');
const { 
  telegraf, commands,
  replyTypes,
} = require('src/clients/telegram-bot/constants');


function emptyMiddleware(ctx, next) {
  next()
}

function configureTelegramBot() {
  const bot = new Telegraf(config.telegramBotToken);
  const session = new TelegrafMongoSession(db, telegraf.sessionSetup);

  bot.use((...args) => session.middleware(...args));
  bot.use(mv.playerIdentificationMiddleware);
  bot.use(mv.manageReplyHistoryStack);
  // bot.use((ctx, next) => {
  //   debugger
  //   // ctx.session.commandsStack = !_.isEmpty(commandsStack) ? : ;
  // })
  bot.start(controller.handleHelpMessage);
  bot.command(commands.HELP, controller.handleHelpMessage);

  bot.command(commands.TOURNAMENTS, controller.handleTournaments); // Y

  console.log('controller.handlePlayerSignUp', controller.handlePlayerSignUp);
  bot.command(commands.SIGN_UP, controller.handlePlayerSignUp); // Y
  // bot.command(commands.SIGN_UP_EDIT, controller.handlePlayerSignUpEdit); // Y

  // bot.command(commands.SUBSCRIBE_SCHEDULE, emptyMiddleware);
  // bot.command(commands.UNSUBSCRIBE_SCHEDULE, emptyMiddleware);

  // bot.command(commands.SEE_RESULTS, emptyMiddleware); // Y
  // bot.command(commands.REPORT_RESULTS, emptyMiddleware);

  bot.use(mv.catchInvalidCommandMiddleware);

  bot.use(mv.textValidationMiddleware);

  console.log('handleTextInput', controller.handleTextInput);
  bot.on(replyTypes.text, controller.handleTextInput);

  bot.launch();
}

module.exports.configure = configureTelegramBot;


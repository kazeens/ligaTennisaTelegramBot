const { Telegraf } = require('telegraf');
const { TelegrafMongoSession } = require('telegraf-session-mongodb');
const _ = require('lodash');

const db = require('src/db');
const config = require('src/config');
const controller = require('src/clients/telegram-bot/controller');
const mv = require('src/clients/telegram-bot/middlewares');
const { telegraf } = require('src/clients/telegram-bot/constants');


function emptyMiddleware(ctx, next) {
  next()
}

function configureTelegramBot() {
  const bot = new Telegraf(config.telegramBotToken);
  const session = new TelegrafMongoSession(db, telegraf.sessionSetup);

  bot.use((...args) => session.middleware(...args));
  bot.use(mv.playerIdentificationMiddleware);
  bot.use(mv.manageReplyHistoryStack);
  bot.use((ctx, next) => {
    debugger
    // ctx.session.commandsStack = !_.isEmpty(commandsStack) ? : ;
  })
  bot.start(controller.handleHelpMessage);
  bot.command('help', controller.handleHelpMessage);
  bot.command('tournaments', controller.handleTournaments); // Y

  bot.command('signup', controller.handlePlayerSignUp); // Y
  bot.command('signupEdit', controller.handlePlayerSignUpEdit); // Y

  bot.command('subscribeSchedule', emptyMiddleware);
  bot.command('unsubscribeSchedule', emptyMiddleware);
  bot.command('subscribe', emptyMiddleware);

  bot.command('seeResults', emptyMiddleware); // Y
  bot.command('reportResults', emptyMiddleware);

  bot.use(mv.catchInvalidCommandMiddleware);

  bot.on('text', (ctx) => {
    ctx.session.history = ctx.session.counter || 0
    ctx.session.counter++
    return ctx.reply(`Message counter:${ctx.session.counter}`)
  });
  bot.launch();
}

module.exports.configure = configureTelegramBot;


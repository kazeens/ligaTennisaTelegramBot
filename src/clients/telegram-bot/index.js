const { Telegraf } = require('telegraf');
const { TelegrafMongoSession } = require('telegraf-session-mongodb');

const _ = require('lodash');
const db = require('src/db');
const config = require('src/config');
const controller = require('src/clients/telegram-bot/controller');
const {
  playerIdentificationMiddleware,
} = require('src/clients/telegram-bot/middlewares')

function configureTelegramBot() {
  const bot = new Telegraf(config.telegramBotToken);

  const session = new TelegrafMongoSession(db, {
    collectionName: 'sessions',
    sessionName: 'session'
  });;

  bot.use((...args) => session.middleware(...args));
  bot.use(playerIdentificationMiddleware)

  bot.start(controller.handleHelpMessage)
  bot.command('help', controller.handleHelpMessage)
  bot.command('tournaments', controller.handleTournaments);
  bot.command('signup', controller.handlePlayerSignUpRequest);
  bot.use((ctx, next) => {
    debugger
    // ctx.session.commandsStack = !_.isEmpty(commandsStack) ? : ;
  })

  bot.on('text', (ctx) => {
    ctx.session.history = ctx.session.counter || 0
    ctx.session.counter++
    return ctx.reply(`Message counter:${ctx.session.counter}`)
  })
  bot.launch()
}

module.exports.configure = configureTelegramBot;


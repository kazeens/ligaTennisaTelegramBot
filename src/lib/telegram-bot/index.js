const { Telegraf } = require('telegraf')

const config = require('../../config');
const controller = require('./controller');
console.log('controller', controller)


function configureTelegramBot() {
  const bot = new Telegraf(config.telegramBotToken);

  bot.start(controller.handleHelpMessage)
  bot.command('help', controller.handleHelpMessage)
  bot.command('tournaments', controller.handleTournaments);
  bot.on('text', (ctx) => ctx.reply('Hey'))
  bot.launch()
}

module.exports = configureTelegramBot();

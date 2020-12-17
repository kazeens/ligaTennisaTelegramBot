
const { Markup } = require('telegraf');

const { startMessage, tournament, signUpMessage } = require('src/clients/telegram-bot/constants');

module.exports = {
  handleHelpMessage,
  handleTournaments,
  handlePlayerSignUpRequest,
};

function handleHelpMessage(ctx) {
  ctx.reply(startMessage)
}

function handleTournaments(ctx) {
  return ctx.reply('Custom buttons keyboard', 
  {
    reply_markup: Markup
      .keyboard([
        ...tournament.pickQuestionOptions.map(option => [option]),
      ])
      .oneTime()
      .resize()
  });
};

function handlePlayerSignUpRequest(ctx) {
  ctx.reply(signUpMessage);
}

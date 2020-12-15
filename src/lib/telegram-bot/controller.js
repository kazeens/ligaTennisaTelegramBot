
const { Markup } = require('telegraf');

const { startMessage, tournament } = require('./constants');

module.exports = {
  handleHelpMessage,
  handleTournaments,
};

function handleHelpMessage(ctx) {
  ctx.reply(startMessage)
}

function handleTournaments(ctx) {
  const chatId = ctx.chat.id;
  debugger
  console.log('tournament', tournament);
  ctx.reply(chatId, );
  ctx.reply(
    tournament.pickQuestion,
    Markup.keyboard(tournament.pickQuestionOptions, {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
    }));
}

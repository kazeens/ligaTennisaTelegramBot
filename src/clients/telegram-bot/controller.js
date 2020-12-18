
const { Markup } = require('telegraf');
const _ = require('lodash');
const { 
  startMessage, tournament,
  signUpMessage, signUpErrorMessage,
} = require('src/clients/telegram-bot/messages');

module.exports = {
  handleHelpMessage,
  handleTournaments,
  handlePlayerSignUpRequest,
};

function handleHelpMessage(ctx) {
  return ctx.reply(startMessage)
}

function handleTournaments(ctx) {
  console.log('ctx.session.player', ctx.session.player);
  if(_.isEmpty(ctx.session.player)) {
    const tournamentsReply = tournament.pickQuestionOptions.join('\n');
    const replyMessage = `${tournamentsReply}\n${tournament.recommendationToParticipate}`;

    return ctx.reply(replyMessage);
  }

  return ctx.reply('Выбери текущий туринир, в котором хочешь принять участие', 
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
  if(!_.isEmpty(ctx.session.player)) {
    return ctx.reply(signUpErrorMessage);
  }

  return ctx.reply(signUpMessage);
}

function handlePlayerSignUpEdit(ctx) {
  return ctx.reply(signUpMessage);
}

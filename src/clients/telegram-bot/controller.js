
const { Markup } = require('telegraf');
const _ = require('lodash');

const playerRepository = require('src/modules/player/repository')

const { 
  startMessage, tournament,
  signUpMessage, signUpErrorMessage,
} = require('src/clients/telegram-bot/messages');
const { commands } = require('src/clients/telegram-bot/constants');


module.exports = {
  handleHelpMessage,
  handleTournaments,
  handleTextInput,
  handlePlayerSignUp,
};

const textHandlersMapper = {
  [commands.SIGN_UP]: signUpTextHanlder,
};

function handleTextInput(ctx) {
  const { command } = ctx.state;
  const textHanlder = textHandlersMapper[command]

  return textHanlder(ctx);
}

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

function handlePlayerSignUp(ctx) {
  if(!_.isEmpty(ctx.session.player)) {
    return ctx.reply(signUpErrorMessage);
  }

  return ctx.reply(signUpMessage);
}

function handlePlayerSignUpEdit(ctx) {
  return ctx.reply(signUpMessage);
}


async function signUpTextHanlder(ctx) {
  const validatedData = ctx.state.validationResult;
  const telegramId = ctx.from.id;
  const playerData = { ...validatedData, telegramId };
  await playerRepository.create(playerData);
  
  return ctx.reply('Отлично, теперь я тебя знаю ;)')
}
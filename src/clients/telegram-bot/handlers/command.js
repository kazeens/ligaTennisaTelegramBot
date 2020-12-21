
const { Markup } = require('telegraf');
const _ = require('lodash');
const moment = require('moment');
const { 
  startMessage, tournament,
  signUpMessage, signUpErrorMessage,
  tournamentRequestParticipationMessage,
} = require('src/clients/telegram-bot/messages');
const { tournamentDateLabelFormat } = require('src/clients/telegram-bot/constants')
const tournamentService = require('src/modules/tournament/service')
const tournamentRepository = require('src/modules/tournament/repository')


module.exports = {
  handleStartMessage,
  handleHelpMessage,
  handleTournaments,
  handlePlayTournament,
  handleExitTournament,
  handleSignUp,
  handleSignUpEdit,
  handleScheduleSubscription,
  handleScheduleUnsubscription,
  handleMatchReporting,
}

// Написать cancel команду!!!!

moment.locale('ru')


function handleStartMessage(ctx) {
  return ctx.reply(startMessage)
}

function handleHelpMessage(ctx) {
  return ctx.reply(startMessage) // TO DO: Change to real help message
}

async function handleTournaments(ctx) { // TO DO: beautify
  const tournaments = await tournamentService.getUpComingTournaments();
  const tournamentsDescriptions = tournaments
    .map(({ 
      name,
      description,
      number,
      startDate,
      endDate,
    }) => (
    `\n<i><b>${name} ${number}</b></i>\n<i>${description}</i>
Даты проведения:
c ${moment(startDate).format(tournamentDateLabelFormat)} по ${moment(endDate).format(tournamentDateLabelFormat)}\n`))
    .join('')
  const replyMessage = `${tournamentRequestParticipationMessage}
  ${tournamentsDescriptions}
Если хочешь принять участие - воспользуйся командой \n/play_tournament`;

  return ctx.reply(replyMessage, {parse_mode: 'HTML'});
};

async function handlePlayTournament(ctx) {
  if(_.isEmpty(ctx.session.player)) {
    const tournamentsReply = tournament.pickQuestionOptions.join('\n');
    const replyMessage = `${tournamentsReply}\n${tournament.recommendationToParticipate}`;

    return ctx.reply(replyMessage);
  }

  const tournaments = await tournamentService.getUpComingTournaments();
  const tournamentButtons =  tournaments.map(({ name,number }) => [`${name} ${number}`]);
  const replyMessage = 'Выбери турнир, в котором хочешь принять участие';

  return ctx.reply(replyMessage, 
  {
    reply_markup: Markup
      .keyboard(tournamentButtons)
      .oneTime()
      .resize(),
    parse_mode: 'HTML',
  });
};

async function handleExitTournament(ctx) {
  const { player } = ctx.session;

  if(_.isEmpty(player)) {
    const replyMessage = 'Нельзя выйти из турнира, если мы еще с тобой не познокомились с помощью команды /signUp'

    return ctx.reply(replyMessage);
  }
  const playerTournamentsQuery = {
    participants: {id: player.id },    
  }
  const tournaments = await tournamentRepository.getAll(playerTournamentsQuery);
  const tournamentButtons =  tournaments.map(({ name,number }) => [`${name} ${number}`]);
  const replyMessage = 'Выбери турнир из которого ты хочешь выйти';

  return ctx.reply(replyMessage, 
    {
      reply_markup: Markup
        .keyboard(tournamentButtons)
        .oneTime()
        .resize(),
      parse_mode: 'HTML',
    });
};

function handleSignUp(ctx) {
  if(!_.isEmpty(ctx.session.player)) {
    return ctx.reply(signUpErrorMessage);
  }

  return ctx.reply(signUpMessage);
}

function handleSignUpEdit(ctx) {
  return ctx.reply('Введи свое новое имя :)');
}

function handleScheduleSubscription(ctx) {
  return ctx.reply(signUpMessage);
}

function handleScheduleUnsubscription(ctx) {
  return ctx.reply(startMessage)
}

function handleMatchReporting(ctx) {
  return ctx.reply(startMessage)
}
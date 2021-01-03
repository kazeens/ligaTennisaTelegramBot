
const _ = require('lodash');
const moment = require('moment');
const Promise = require('bluebird');

const VkApiService = require('src/services/vk');
const tournamentRepository = require('src/modules/tournament/repository');
const playerRepository = require('src/modules/player/repository')

const { 
  tournamentsTypes,
  tournamentCancelationNote,
} = require('src/modules/tournament/constants');
const { 
  parseTournamentTitle,
  getParticipantName,
} = require('src/clients/vk-bot/utils')

module.exports = {
  getTournaments,
  // handleWallNewPostEvent,
  handleBoardNewPostEvent,
  handleBoardPostEditEvent,
  handleBoardPostDeleteEvent,
}
// Пожалания ко времени игрока при записи
async function getTournaments() {
  const { items } = await VkApiService.group.getTopics();
  const currentDate = moment();

  await Promise.each(items, async ({ title, id }) => {
      const isTournamentsTopic = tournamentsTypes.find(tournament => title.includes(tournament));
      if(!isTournamentsTopic) {
        return;
      }

      const tournamentData = parseTournamentTitle(title);
      const fullTournamentData = { topicId: id, ...tournamentData };

      if(currentDate.isAfter(tournamentData.endDate)) {
        return ;
      }

      /* Поиск уже существующего по name, number, year
      * Если найдент обнови, если нет добавь
      * Скачай участников из треда этого топика. Добавь в проперти participants
      */
      const { name, number, startDate, endDate } = tournamentData;
      const tournamentQuery = { name, number, startDate: startDate.toDate(), endDate: endDate.toDate() };
      const tournament = await tournamentRepository.findOne(tournamentQuery);

      if(!tournament) {
        await tournamentRepository.create(fullTournamentData);
      }
  });

}

// async function handleWallNewPostEvent(params) {
  
// }

async function handleBoardNewPostEvent(eventData) {
  const { object: {topic_id, from_id, text, id } } = eventData;
  const isCancelledText = text === tournamentCancelationNote;

  if(isCancelledText) {
    // Notify participants in telegram
    return tournamentRepository.cancelTournament({topicId: topic_id});
  }

  const tournament = await tournamentRepository.findOne({topicId: topic_id});

  const isAlreadyInTournament = tournament && tournament.participants
    .find(({ topicCommentId }) => topicCommentId === id);

  const participant = await getParicipantNameData(text, from_id);

  if(!tournament || isAlreadyInTournament || !participant) {
    return;
  }

  const playerTournamentData = await makeUpPlayerNewData(participant, id);

  const tournamentQuery = {id: tournament.id};
  await tournamentRepository.addParticipant(tournamentQuery, playerTournamentData); 
}

async function handleBoardPostEditEvent(eventData) {
  const { object: {topic_id, from_id, text, id: commentId } } = eventData;

  if(isCancelledText) {
    // Notify participants in telegram
    return tournamentRepository.cancelTournament({topicId: topic_id});
  }

  const tournament = await tournamentRepository.findOne({topicId: topic_id});

  const participant = await getParicipantNameData(text, from_id);

  if(!tournament || !participant) {
    return;
  }

  if(text === tournamentCancelationNote) { 
    return tournamentRepository.cancelTournament({topicId: topic_id});
    // Notify participants in telegram
  }

  const previousPlayerParticipantQuery = { topicCommentId: id };
  const tournamentQuery = { id: tournament.id };
  await tournamentRepository.removeParticipant(tournamentQuery, previousPlayerParticipantQuery);

  const playerTournamentData = await makeUpPlayerNewData(participant, commentId);

  await tournamentRepository.addParticipant(tournamentQuery, playerTournamentData); 
}

async function handleBoardPostDeleteEvent(eventData) {
  const { object: { topic_id, id } } = eventData;
  const tournament = await tournamentRepository.findOne({topicId: topic_id});

  if(!tournament) {
    return;
  }

  const tournamentQuery = { id: tournament.id };
  const previousPlayerParticipation = { topicCommentId: id };
  await tournamentRepository.removeParticipant(tournamentQuery, previousPlayerParticipation);
}


async function getParicipantNameData(text, sourceUserId) {
  const user = await VkApiService.users.getUser(sourceUserId);
  const participant = getParticipantName(text, user);

  return participant;
}

async function makeUpPlayerNewData(participant, id) {
  const existingPlayer = await playerRepository.findOne(participant);
  let playerTournamentData = { topicCommentId: id};

  if(existingPlayer) {
    playerTournamentData = {...playerTournamentData, ...existingPlayer};
  } else {
    playerTournamentData = {...playerTournamentData, ...participant}
  }

  return playerTournamentData;
}

const _ = require('lodash');
const moment = require('moment');
const Promise = require('bluebird');

const VkApiService = require('src/services/vk');
const tournamentRepository = require('src/modules/tournament/repository');
const playerRepository = require('src/modules/player/repository')

const { getPlayerName } = require('src/clients/telegram-bot/utils');

const { 
  tournamentsTypes
} = require('src/modules/tournament/constants');
const { 
  getTournamentsDates,
  parseTournamentTitle,
  getParticipantName,
} = require('src/clients/vk-bot/utils')

module.exports = {
  getTournaments,
  getTournamentsPlayers,
  handleWallNewPostEvent,
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

async function getTournamentsPlayers() {
  
}

async function setTournamentsPlayers() {
  
}

async function handleWallNewPostEvent(params) {
  
}


async function handleBoardNewPostEvent(eventData) {
  const { object: {topic_id, from_id, text, id } } = eventData;
  const tournament = await tournamentRepository.findOne({topicId: topic_id});

  if(!tournament) {
    return;
  }

  // Если пользуетесь телеграм ботом Лиги Тенниса и хотите, чтобы ваша заявка была синхронизирована с ним, введите полностью свою Фамилию и Имя
  // Можно также оставлять + , при условии что ваши имя и фамилия вконтакте, совпадают с тем как вы представились боту
  const user = await VkApiService.users.getUser(from_id);

  const tournamentQuery = {id: tournament.id};
  const participant = getParticipantName(text, user);
  const playerQuery = _.pick(participant, ['firstName', 'lastName']);
  let playerTournamentData = {
    topicCommentId: id,
  };
  const existingPlayer = await playerRepository.findOne(playerQuery);
  if(existingPlayer) {
    playerTournamentData = {...playerTournamentData, ...existingPlayer};
  } else {
    playerTournamentData = {...playerTournamentData, ...participant}
  }

  await tournamentRepository
    .addParticipant(tournamentQuery, playerTournamentData);
  
  logger.log(eventData)
}

async function handleBoardPostEditEvent(eventData) {
  const { object: {topic_id, from_id, text, id } } = eventData;
  debugger
}

async function handleBoardPostDeleteEvent(params) {
  
}

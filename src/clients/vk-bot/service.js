
const _ = require('lodash');
const moment = require('moment');
const Promise = require('bluebird');


const VkApiService = require('src/services/vk');
const tournamentRepository = require('src/modules/tournament/repository');

const { 
  tournamentsTypes, tournamentsTypesMap,
  russianMonthToNumberMapper, russianMonth,
  beforeDateSeparators,
} = require('src/modules/tournament/constants');
const { 
  getTournamentsDates,
  parseTournamentTitle,
} = require('src/clients/vk-bot/utils')

module.exports = {
  getTournaments,
  getTournamentsPlayers,
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

const _ = require('lodash');
const moment = require('moment');
const VkApiService = require('src/services/vk');
const { 
  tournamentsTypes, tournamentsTypesMap,
  russianMonthToNumberMapper, russianMonth,
  beforeDateSeparators,
} = require('src/modules/tournament/constants');

const whiteSpace = ' ';

module.exports = {
  getTournaments,
  getTournamentsPlayers,
  setTournamentsPlayers,
}

function indexAfterWords(string, rawSeparators) {
  const words = Array.isArray(rawSeparators) ? rawSeparators : [rawSeparators];

  return words.map(word => {
    const indexOfWord = string.indexOf(word);
    const indexAfterWord = indexOfWord + word.length;
    return indexOfWord < 0 ? indexOfWord : indexAfterWord;
  })
}

async function getTournaments() {
  const { items } = await VkApiService.group.getTopics();
  
  const futureTournaments = items.filter(({title, created}) => {
    const isTournamentsTopic = tournamentsTypes.find(tournament => title.includes(tournament));
    const indexOfCharacterBeforeDateValue = indexAfterWords(title, beforeDateSeparators)
    const dateString = title
      .substring(indexOfCharacterBeforeDateValue)
      .trim()
    const amountOfMonthsInSentence = dateString
      .split(whiteSpace)
      .filter(word => russianMonth.find(word)).length;
    if(amountOfMonthsInSentence > 1) {
      /* Parse these kind of string
      FUTURES 37 (турнир для игроков начинающего уровня) ДАТЫ: 26 ноября - 2 декабря
      */
      const dayIndex = _.findIndex(dateString, (word, index) => {
        const isPreviousSeparator = dateString[index-1] === ':';

        return isPreviousSeparator;
      });

      const day = Number(dateString[dayIndex]);
      const monthIndex = dayIndex + 1;
      const month = russianMonthToNumberMapper[dateString[monthIndex]];

      return { startDate: moment().set({month: month, date: day}) };
    } 

    
    const [rawStartDate, rawEndDate] = dateString
      .split('-')
      .map(word => word.trim().split(' '))

      const [rawStartDay, rawStartMonth] = rawStartDate;
      const [rawEndDay, rawEndMonth] = rawEndDate;

      const tournamentPeriod = {
        startDate: moment().set({
          month: russianMonthToNumberMapper[rawStartMonth],
          date: rawStartDay,
        }),
        endDate: moment().set({
          month: russianMonthToNumberMapper[rawEndMonth],
          date: rawEndDay,
        }),
      };

      return tournamentPeriod;
  });


}

function getTournamentsStartDate() {

}

function getFutureTournaments() {

}

async function getTournamentsPlayers() {
  
}

async function setTournamentsPlayers() {
  
}
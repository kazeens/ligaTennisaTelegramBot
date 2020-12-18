
const _ = require('lodash');
const moment = require('moment');
const VkApiService = require('src/services/vk');
const { 
  tournamentsTypes, tournamentsTypesMap,
  russianMonthToNumberMapper, russianMonth,
} = require('src/modules/tournament/constants');

module.exports = {
  getTournaments,
  getTournamentsPlayers,
  setTournamentsPlayers,
}

async function getTournaments() {
  const { items } = await VkApiService.group.getTopics();
  
  const futureTournaments = items.filter(({title, created}) => {
    const words = title.split(' ');
    const dateString =  words.substring('ДАТЫ:').split(' ');
    const amountOfMonthsInSentence = dateString
      .filter(word => russianMonth.find(word)).length;
    if(amountOfMonthsInSentence > 1) {
      const dayIndex = _.findIndex(dateString, (word, index) => {
        const isPreviousSeparator = dateString[index-1] === ':';

        return isPreviousSeparator;
      });

      const day = Number(dateString[dayIndex]);
      const monthIndex = dayIndex + 1;
      const month = russianMonthToNumberMapper[dateString[monthIndex]];

      return moment().set({month: month, date: day})
    } 




    const startDate = date[0];
    const endDate = date
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
const moment = require('moment');
const _ = require('lodash');
const toCamelCase = require('camelcase-keys');

const { 
  russianMonthToNumberMapper, russianMonth,
  beforeDateSeparators, beforeDateSeparatorsMap,
  defaultTournamentDaysDuration, whiteSpace
} = require('src/modules/tournament/constants');


module.exports = {
  getTournamentsDates,
  parseTournamentTitle,
  parseBoardComment,
  getParticipantName,
};

function parseTournamentTitle(title) {
  const titleWords = title.split(' ');
  const name = titleWords[0];
  const number = titleWords[1];
  const descriptionOpeningDelimeterIndex = title.indexOf('(') + 1;
  const descriptoinClosingDelimeterIndex = title.indexOf(')');

  const description = title
    .substring(descriptionOpeningDelimeterIndex, descriptoinClosingDelimeterIndex);

  const { startDate, endDate } = getTournamentsDates(title)
  
  return {
    name,
    number,
    description,
    startDate,
    endDate,
  }
}

function getTournamentsDates(title) {
  const indexOfCharacterBeforeDateValue = indexAfterWords(title, beforeDateSeparators);
  const dateString = title
    .substring(indexOfCharacterBeforeDateValue)
    .trim();
  const dateData = dateString.split(whiteSpace);
  const amountOfMonthsInSentence = dateData
    .filter(word => russianMonth.includes(word)).length;

  /* 
    Parse these kind of string
    FUTURES 37 (турнир для игроков начинающего уровня) ДАТЫ: 26 ноября - 2 декабря
  */
  if(amountOfMonthsInSentence > 1) {
    const startDayIndex = _.findIndex(dateData, word => !_.isNaN(Number(word)))

    const startDay = Number(dateData[startDayIndex]);
    const startMonthIndex = startDayIndex + 1;
    const startMonth = russianMonthToNumberMapper[dateData[startMonthIndex]];

    const endDayIndex = startMonthIndex + 2;
    const endMonthIndex = endDayIndex + 1;
    const endDay = Number(dateData[endDayIndex]);
    const month = dateData[endMonthIndex];
    const endMonth = russianMonthToNumberMapper[month];

    const startDate =  moment().set({month: startMonth, date: startDay});
    const endDate = moment().set({month: endMonth, date: endDay});

    if(russianMonth[0] === month) {
      endDate.add(1, 'year');
    }

    return {
      startDate,
      endDate,
    };
  } 

  /*
   * Parse these kind of strings
   * SATELLITE 7 (для новичков) СТАРТ: 28 марта
   */
  if(title.includes(beforeDateSeparatorsMap.START)) {
    const day = dateData[0];
    const month = russianMonthToNumberMapper[dateData[1]];
    // By default add 10 day for tournament
    const startDate = moment().set({ month, date: Number(day)});
    const endDate = startDate.add(defaultTournamentDaysDuration, 'days');

    return {
      startDate,
      endDate,
    };  
  }
  /*
   * Parse these kind of strings
   * SUPER CHALLENGER 8 (турнир для игроков среднего уровня) ДАТЫ: 3-9 декабря
   */
  
  const [rawStartDay, rawEndDay] = dateData[0].split('-');
  const month = russianMonthToNumberMapper[dateData[1]];

  return {
    startDate: moment().set({ month, date: Number(rawStartDay)}),
    endDate: moment().set({ month, date: Number(rawEndDay)}),
  };
};

function indexAfterWords(string, rawSeparators) {
  const words = Array.isArray(rawSeparators) ? rawSeparators : [rawSeparators];

  return words
    .map(word => {
      const indexOfWord = string.indexOf(word);
      const indexAfterWord = indexOfWord + word.length;
      return indexOfWord < 0 ? indexOfWord : indexAfterWord;
    })
    .find(index => index >= 0)
}

function parseBoardComment() {
  
}

function getParticipantName(commentText, user) { // написать лучше!
  const pureName = commentText.replace(/\+/g, '').trim()
  if(_.isEmpty(pureName)) {
    return toCamelCase(user);
  }

  const [lastName, firstName] = pureName.split(' ');

  return { firstName, lastName };
}
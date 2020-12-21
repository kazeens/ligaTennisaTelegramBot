
const tournamentsTypesMap = {
  FUTURES: 'FUTURES',
  SATELLITE: 'SATELLITE',
  CHALLENGER: 'CHALLENGER',
  MASTERS: 'MASTERS',
  PRO: 'PRO',
  SUPER_FUTURES: 'SUPER FUTURES',
  SUPER_SATELLITE: 'SUPER SATELLITE',
  SUPER_CHALLENGER: 'SUPER CHALLENGER',
  SUPER_MASTERS: 'SUPER MASTERS',
  SUPER_PRO: 'SUPER PRO',
  DOUBLES_SATELLITE: 'DOUBLES SATELLITE',
  DOUBLES_FUTURES: 'DOUBLES FUTURES',
  DOUBLES_CHALLENGER: 'DOUBLES CHALLENGER',
  DOUBLES_MASTERS: 'DOUBLES MASTERS',
  DOUBLES_PRO: 'DOUBLES PRO',
  FINAL_FUTURES: 'ИТОГОВЫЙ FUTURES',
  FINAL_SATELLITE: 'ИТОГОВЫЙ SATELLITE',
  FINAL_CHALLENGER: 'ИТОГОВЫЙ CHALLENGER',
  FINAL_MASTERS: 'ИТОГОВЫЙ MASTERS',
  FINAL_PRO: 'ИТОГОВЫЙ PRO',
  FINAL_DOUBLES_SATELLITE: 'ИТОГОВЫЙ DOUBLES SATELLITE',
  FINAL_DOUBLES_FUTURES: 'ИТОГОВЫЙ DOUBLES FUTURES',
  FINAL_DOUBLES_CHALLENGER: 'ИТОГОВЫЙ DOUBLES CHALLENGER',
  FINAL_DOUBLES_MASTERS: 'ИТОГОВЫЙ DOUBLES MASTERS',
  FINAL_DOUBLES_PRO: 'ИТОГОВЫЙ DOUBLES PRO',
}

const tournamentsTypes = Object.values(tournamentsTypesMap);

const russianMonthToNumberMapper = {
  'января': 0,
  'февраля': 1,
  'марта': 2,
  'апреля': 3,
  'мая': 4,
  'июня': 5,
  'июля': 6,
  'августа': 7,
  'сентября': 8,
  'октября': 9,
  'ноября': 10,
  'декабря': 11,
};

const beforeDateSeparatorsMap = {
  DATES: 'ДАТЫ:',
  START: 'СТАРТ:'
}

const whiteSpace = ' ';

const defaultTournamentDaysDuration = 10;

const beforeDateSeparators = Object.values(beforeDateSeparatorsMap);

const russianMonth = Object.keys(russianMonthToNumberMapper);

module.exports = {
  tournamentsTypesMap,
  tournamentsTypes,
  russianMonthToNumberMapper,
  russianMonth,
  beforeDateSeparators,
  beforeDateSeparatorsMap,
  defaultTournamentDaysDuration,
  whiteSpace,
}
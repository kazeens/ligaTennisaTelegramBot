
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
  SUPER_DOUBLES_SATELLITE: 'SUPER DOUBLES SATELLITE',
  SUPER_DOUBLES_FUTURES: 'SUPER DOUBLES FUTURES',
  SUPER_DOUBLES_CHALLENGER: 'SUPER DOUBLES CHALLENGER',
  SUPER_DOUBLES_MASTERS: 'SUPER DOUBLES MASTERS',
  SUPER_DOUBLES_PRO: 'SUPER DOUBLES PRO',
}

const tournamentsTypes = Object.values(tournamentsTypesMap);

const tournamentCancelationNote = 'ТУРНИР НЕ СОСТОЯЛСЯ. ЗАПИСЬ ОТМЕНЕНА.';

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
  tournamentCancelationNote,
  tournamentsTypesMap,
  tournamentsTypes,
  russianMonthToNumberMapper,
  russianMonth,
  beforeDateSeparators,
  beforeDateSeparatorsMap,
  defaultTournamentDaysDuration,
  whiteSpace,
}
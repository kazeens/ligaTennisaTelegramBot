
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

const beforeDateSeparators = ['ДАТЫ:', 'СТАРТ:'];

const russianMonth = Object.keys(russianMonthToNumberMapper);

module.exports = {
  tournamentsTypesMap,
  tournamentsTypes,
  russianMonthToNumberMapper,
  russianMonth,
  beforeDateSeparators,
}
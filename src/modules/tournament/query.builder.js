'use strict';

const { setIfExist } = require('src/utils/common');;
const { set } = require('lodash');

module.exports = {
    buildQuery,
};

function buildQuery(rawQuery = {}) {
    const result = {};

    setIfExist(result, '_id', rawQuery.id);
    setIfExist(result, 'name', rawQuery.name);
    setIfExist(result, 'number', rawQuery.number);

    if(rawQuery.range) {
      if(rawQuery.range.from) {
        set(result, 'startDate.$gt', rawQuery.range.from);
      }

      if(rawQuery.range.to) {
        set(result, 'startDate.$lt', rawQuery.range.to);
      }
    }

    if(rawQuery.playerTournamentId) {
      result.participants = { $elemMatch: {id: rawQuery.playerTournamentId }};
    }

    return result;
}

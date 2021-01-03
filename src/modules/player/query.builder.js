'use strict';

let { setIfExist } = require('src/utils/common');

module.exports = {
    buildQuery,
};

function buildQuery(rawQuery = {}) {
    let result = {};

    setIfExist(result, '_id', rawQuery.id);
    setIfExist(result, 'telegramId', rawQuery.telegramId);
    setIfExist(result, 'firstName', rawQuery.firstName);
    setIfExist(result, 'lastName', rawQuery.lastName);

    return result;
}

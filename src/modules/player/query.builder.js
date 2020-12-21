'use strict';

let { setIfExist } = require('src/utils/common');

module.exports = {
    buildQuery,
};

function buildQuery(rawQuery = {}) {
    let result = {};

    setIfExist(result, '_id', rawQuery.id);

    return result;
}

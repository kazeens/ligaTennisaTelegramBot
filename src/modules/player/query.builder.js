'use strict';

let { setIfExist } = require('src/utils/common');

module.exports = {
    buildQuery,
};

function buildQuery(query = {}) {
    let result = {};

    setIfExist(result, '_id', query.id);

    return result;
}

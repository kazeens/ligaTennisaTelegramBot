const Tournaments = require('src/modules/tournaments/model');
// const { buildQuery } = require('src/modules/corporate-package/query.builder');


module.exports = {
    getAll,
    findOne,
    create,
    update,
};

function buildQuery() {
  return {};
}

function getAll(query) {
    return Tournaments
        .find(buildQuery(query))
        .sort({ name: 1 })
        .then(data => data.map(cleanUp));
}

function findOne(query) {
    return Tournaments
        .findOne(buildQuery(query))
        .then(cleanUp);
}

function create(data) {
    const Tournaments = new Tournaments(data);

    return Tournaments
        .save()
        .then(cleanUp);
}

function update(id, data) {
    return Tournaments
        .updateOne(buildQuery({ id }), data)
        .then(() => findOne(buildQuery({ id }), scope));
}

function cleanUp(data) {
    if (!data) {
        return data;
    }

    return data.toJSON();
}

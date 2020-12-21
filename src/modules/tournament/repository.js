const Tournament = require('src/modules/tournament/model');
const { buildQuery } = require('src/modules/tournament/query.builder');

module.exports = {
    getAll,
    findOne,
    create,
    update,
    addParticipant,
    removeParticipant,
};

function getAll(query) {
    console.log(buildQuery(query));
    return Tournament
        .find(buildQuery(query))
        .then(data => data.map(cleanUp));
}

function findOne(query) {
    return Tournament
        .findOne(buildQuery(query))
        .then(cleanUp);
}

function create(data) {
    const tournament = new Tournament(data);
    return tournament
        .save()
        .then(cleanUp);
}

function update(id, data) {
    return Tournament
        .findOneAndUpdate(buildQuery({ id }), data)
        .then(() => findOne(buildQuery({ id }), scope));
}

function addParticipant(query, player) {
    return Tournament
        .update(buildQuery(query), { $push: { participants: player }})
        .then(() => findOne(buildQuery(query)));
}

function removeParticipant(query, playerId) {
    return Tournament
        .update(buildQuery(query), { $pull: { participants: {id: playerId }}})
        .then(() => findOne(buildQuery(query)));
}

function cleanUp(data) {
    if (!data) {
        return data;
    }

    return data.toJSON();
}

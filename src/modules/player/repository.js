const Player = require('src/modules/player/model');
const { buildQuery } = require('src/modules/player/query.builder');

module.exports = {
  findOne,
  create,
  update,
}

function findOne(query) {
  return Player
    .findOne(buildQuery(query))
    .then(cleanUp);
}

function create(data) {
  const player = new Player(data);

  return player
    .save()
    .then(cleanUp);
}

function update(query, data) {
  return Player
      .findOneAndUpdate(buildQuery(query), data)
      .then(() => findOne(buildQuery(query)));
}

function cleanUp(player) {
  if (!player) {
      return player;
  }

  return player.toJSON();
};

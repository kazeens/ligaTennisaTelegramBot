const Player = require('src/modules/player/model');
const { buildQuery } = require('src/modules/player/query.builder');

module.exports = {
  findOne,
}

function findOne(query) {
  return Player
    .findOne(buildQuery(query))
    .then(cleanUp);
}


function cleanUp(player) {
  if (!player) {
      return player;
  }

  return player.toJSON();
}

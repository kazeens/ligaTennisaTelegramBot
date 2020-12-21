
const playerRepository = require('src/modules/player/repository');
const tournamentRepository = require('src/modules/tournament/repository');

module.exports = {
  create,
};

function create(data) {
  return playerRepository.create(data);
}

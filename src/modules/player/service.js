
const playerRepository = require('src/modules/player/repository')

module.exports = {
  create,
};

function create(data) {
  return playerRepository.create(data);
}
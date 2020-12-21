
const tournametRepository = require('src/modules/tournament/repository');

module.exports = {
  signPlayerToTournament,
  getUpComingTournaments,
}

function signPlayerToTournament() {
  
}

function getUpComingTournaments() {
  const currentDate = Date();
  const range = { range: { from: currentDate }};

  return tournametRepository.getAll(range);
}
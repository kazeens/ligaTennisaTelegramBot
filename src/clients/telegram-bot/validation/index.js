
const schemas = require('src/clients/telegram-bot/validation/schemas')
const tournamentRepository = require('src/modules/tournament/repository');

module.exports = {
  signUp,
  signUpEdit,
  playTournament,
  exitTournament,
};

function signUp(text) {
  const [lastName, firstName] = text.split(' ');
  const data = {
    lastName, 
    firstName,
  };

  return schemas.signUp.validate(data);;
}

function signUpEdit(text) {
  return signUp(text);
}

async function playTournament(text, ctx) {
  const [name, number] = text.split(' ');
  const query = {name, number};
  const tournament = await tournamentRepository.findOne(query);

  if(!tournament) {
    return {error: 'Таких турниров сейчас не проходит'};
  }
  const { player } = ctx.session;
  const playerQuery = {
    ...query,
    playerTournamentId: player.id,
  }

  const playerTournament = await tournamentRepository.findOne(playerQuery);

  if(playerTournament) {
    return {error: 'Не волнуйся, я тебя уже записал ;)'}
  }

  return { value: tournament}
}

async function exitTournament(text, ctx) {
  const [name, number] = text.split(' ');
  const query = {name, number};
  const tournament = await tournamentRepository.findOne(query);

  if(!tournament) {
    return {error: 'Таких турниров сейчас не проходит'};
  }

  const { player } = ctx.session;
  const playerQuery = {
    ...query,
    playerTournamentId: player.id,
  }

  const playerTournament = await tournamentRepository.findOne(playerQuery);

  if(!playerTournament) {
    return {error: 'На сколько мне известно, в этом турнире ты не учавствуешь'}
  }

  return { value: tournament };
}
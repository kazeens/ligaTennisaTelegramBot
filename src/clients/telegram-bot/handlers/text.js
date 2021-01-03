const playerRepository = require('src/modules/player/repository')
const tournamentRepository = require('src/modules/tournament/repository');
const { commands } = require('src/clients/telegram-bot/constants');
const VkApiService = require('src/services/vk');
const { getPlayerName } = require('src/clients/telegram-bot/utils');

module.exports = {
  handleTextInput,
};

const textHandlersMapper = {
  [commands.SIGN_UP]: signUpTextHanlder,
  [commands.SIGN_UP_EDIT]: signUpEditTextHandler,
  [commands.PLAY_TOURNAMENT]: tournamentParticipationTextHanlder,
  [commands.EXIT_TOURNAMENT]: tournamentExitTextHandler,
};

function handleTextInput(ctx) {
  const { command } = ctx.state;
  const textHanlder = textHandlersMapper[command]
  return textHanlder(ctx);
}

async function signUpTextHanlder(ctx) {
  const validatedData = ctx.state.validationResult;
  const telegramId = ctx.from.id;
  const playerData = { ...validatedData, telegramId };
  await playerRepository.create(playerData);
  // Найти его в текущих турнирах и расширить его объект в проперти participants
  return ctx.reply('Отлично, теперь мы знакомы ;)')
}

async function signUpEditTextHandler(ctx) {
  const validatedData = ctx.state.validationResult;
  const { player: { id } } = ctx.session;

  await playerRepository.update({id}, validatedData);
  // Найти его в текущих турнирах и расширить его объект в проперти participants

  return ctx.reply('Все, я обновил твое имя');
};

async function tournamentParticipationTextHanlder(ctx) {
  const tournament = ctx.state.validationResult;
  const { player } = ctx.session;
  const query = { id: tournament.id };
  const playerName = getPlayerName(player);

  const topicCommentId = await VkApiService.topic.addComment(tournament.topicId, playerName);
  const data = {topicCommentId, ...player}
  await tournamentRepository.addParticipant(query, data);

  return ctx.reply('Все, записал!')
}

async function tournamentExitTextHandler(ctx) {
  const tournament = ctx.state.validationResult;
  const { player: {id: playerId } } = ctx.session;
  const query = {id: tournament.id};
  const { topicCommentId } = tournament.participants
    .find(({id}) => playerId === id);

  try {
    await Promise.all([
      tournamentRepository.removeParticipant(query, playerId),
      VkApiService.topic.removeComment(tournament.topicId, topicCommentId),
    ]);

    return ctx.reply('Все, больше ты в нем не участвуешь 😒')
  } catch (error) {
    logger.error(error);
  }
}
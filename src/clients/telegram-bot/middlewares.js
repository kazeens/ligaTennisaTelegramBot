const playerRepository = require('src/modules/player/repository');

module.exports = {
  playerIdentificationMiddleware,
};

async function playerIdentificationMiddleware(ctx, next) {
  const telegramId = ctx.from.id;
  const player = await playerRepository.findOne({ telegramId });

  ctx.session.player = player;

  next();
}
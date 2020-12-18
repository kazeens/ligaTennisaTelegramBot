
const playerRepository = require('src/modules/player/repository');
const { botCommand } = require('src/clients/telegram-bot/constants')
const { invalidCommandErrorMessage  } = require('src/clients/telegram-bot/messages')
const utils = require('src/clients/telegram-bot/utils');

module.exports = {
  playerIdentificationMiddleware,
  catchInvalidCommandMiddleware,
  manageReplyHistoryStack,
};


function manageReplyHistoryStack(ctx, next) {
  const messageType = utils.getMessageType(ctx.message);
  const message = { 
    type: messageType,
    value: ctx.message[propertyByReplyType[messageType]] || null,
  };
  const messagesStack = ctx.session.messagesStack || [];
  ctx.session.messagesStack = [...messagesStack, message];

  next();
}

async function playerIdentificationMiddleware(ctx, next) {
  const telegramId = ctx.from.id;
  const player = await playerRepository.findOne({ telegramId });

  ctx.session.player = player;

  next();
}

function catchInvalidCommandMiddleware(ctx, next) {
  const messageType = utils.getMessageType(ctx.message);

  if(messageType === botCommand) {
    return ctx.reply(invalidCommandErrorMessage);
  }

  next();
}

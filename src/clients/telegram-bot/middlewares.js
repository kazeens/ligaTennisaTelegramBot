
const _ = require('lodash');
const playerRepository = require('src/modules/player/repository');
const { 
  replyTypes: { botCommand },
  propertyByReplyType,
  wrongTextMessage,
} = require('src/clients/telegram-bot/constants')
const { invalidCommandErrorMessage  } = require('src/clients/telegram-bot/messages')
const utils = require('src/clients/telegram-bot/utils');
const validation = require('src/clients/telegram-bot/validation')

module.exports = {
  playerIdentificationMiddleware,
  catchInvalidCommandMiddleware,
  manageReplyHistoryStack,
  textValidationMiddleware,
};

function manageReplyHistoryStack(ctx, next) {
  const messageType = utils.getMessageType(ctx.message);
  let messageValue = ctx.message[propertyByReplyType[messageType]] || null;

  if(messageType === botCommand) {
    messageValue = messageValue.substring(1); // Remove slash form command string
  }

  const message = { 
    type: messageType,
    value:  messageValue,
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

async function textValidationMiddleware(ctx, next) {
  const { messagesStack } = ctx.session;
  const { message: { text }} = ctx;
  const command = _.findLast(
    messagesStack,
    ({ type }) => type === botCommand,
  );
  const commandValue = command && command.value;

  if(!command) {
    return ctx.reply(wrongTextMessage);
  }
  console.log('commandValue', commandValue)

  const validationHanlder = validation[commandValue];
  
  const result = await validationHanlder(text);

  if(result.error) {
    return ctx.reply(wrongTextMessage);
  }
  ctx.state.command = commandValue;
  ctx.state.validationResult = result.value;

  next();
}
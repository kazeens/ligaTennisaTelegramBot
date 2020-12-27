
const { groupEventsMap } = require('src/clients/vk-bot/constants')
const service = require('src/clients/vk-bot/service');

const groupEventsHandlerMap = {
  [groupEventsMap.WALL_POST_NEW]: service.handleWallNewPostEvent,
  [groupEventsMap.BOARD_POST_NEW]: service.handleBoardNewPostEvent,
  [groupEventsMap.BOARD_POST_EDIT]: service.handleBoardPostEditEvent,
  [groupEventsMap.BOARD_POST_DELETE]: service.handleBoardPostDeleteEvent,
}

module.exports = {
  handleGroupWebhook,
}

async function handleGroupWebhook(req, res) {

  // return res.status(200).send('14f03838');
  const { body: eventData } = req;
  const eventType = eventData.type; 
  const eventHanlder = groupEventsHandlerMap[eventType];


  try {
    await eventHanlder(eventData);
    return res.status(200).send('ok');    // Required by VK
  } catch (error) {
    return res.status(500).send('Error occured!!!!');
  }
}
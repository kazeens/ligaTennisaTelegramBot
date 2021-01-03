const cron = require('node-cron');

const config = require('src/config');
const { cronJobExpression } = require('src/jobs/vk/constants');
const VKApiService = require('src/services/vk');
const vkHandlers = require('src/clients/vk-bot/service')

// cron.schedule('*/5 * * * * *', function() {
//   console.log('running a task every minute');
// });


// cron.schedule(cronJobExpression, async function () {
//   cron.schedule('*/5 * * * * *', async function () {
//     let response;
//     const communityId = config.vk.groupId;
//     try {
//       response = await vk.api.wall.get({owner_id: -communityId}); 
//       debugger
//     } catch (error) {
//       console.log('error', error)
      
//     }
//     debugger
// });

module.exports.init = function () {
  cron.schedule('*/5 * * * * *', async function () {
  //   let response;
  //   try {
  //     response = await vkHandlers.getTournaments();
  //     console.log('response', response)
  //   } catch (error) {
  //     console.log('error', error)
      
  //   }
  });
};

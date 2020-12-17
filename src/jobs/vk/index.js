const { VK } = require('vk-io');
const cron = require('node-cron');

const config = require('src/config');
const { cronJobExpression } = require('src/jobs/vk/constants');
const VKApiService = require('src/services/vk');
console.log('VKApiService', VKApiService)

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
    let response;
    try {
      response = await VKApiService.group.getTopics(46694885);
      console.log('response', response)
    } catch (error) {
      console.log('error', error)
      
    }
    debugger
  });
};

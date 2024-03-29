
const { VK } = require('vk-io');
const toCamelCase = require('camelcase-keys');

const config = require('src/config');

class VKService {
  constructor() {
    this.vk = new VK({
      token: config.vk.token,
    });
    this.groupId = config.vk.groupId;
    const that = this;
    this.group = {
      async getPosts() {
        let response;
        try {
          response = await that.vk.api.wall.get({owner_id: -that.groupId}); 
        } catch (error) {
          console.log('error getPosts', error)
        }

        return toCamelCase(response);
      },
      async getTopics(order = 1) {
        let response;

        try {
          response = await that.vk.api.board.getTopics({
            group_id: that.groupId,
            order,
          })
        } catch (error) {
          console.log('error getTopics', error)
        }

        return toCamelCase(response);
      }
    }
    this.topic = {
      async addComment(topicId, message) {
        let response;

        try {
          response = await that.vk.api.board.createComment({
            group_id: that.groupId,
            topic_id: topicId,
            message,
            from_group: 1,
          })
        } catch (error) {
          console.log('error addComment', error)
        }

        return toCamelCase(response);
      },
      async removeComment(topicId, commentId) {
        let response;

        try {
          response = await that.vk.api.board.deleteComment({
            group_id: that.groupId,
            topic_id: topicId,
            comment_id: commentId,
          })
        } catch (error) {
          console.log('error addComment', error)
        }

        return toCamelCase(response);
      },
      async getComments(topicId) {
        const commentsDefaultMaxAmount = 100;
        const commentsDefaultSorting = 'asc';

        let response;

        try {
          response = await that.vk.api.board.getComments({
            group_id: that.groupId,
            topic_id: topicId,
            count: commentsDefaultMaxAmount,
            extended: 1,
            sort: commentsDefaultSorting,
          })
        } catch (error) {
          console.log('error getComments', error)
        }

        return toCamelCase(response);
      }
    }
    this.users = {
      async getUser(id) {
        const user_ids = `${id}`;

        let response;

        try {
          [response] = await that.vk.api.users.get({user_ids})
        } catch (error) {
          logger.error(error);
          return;
        }

        return response;
      }
    }
  }
}

module.exports = new VKService();

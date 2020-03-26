const conn = require('../connection/conn');
const { Sequelize } = conn;
const { Op } = Sequelize;

const Conversation = conn.define('conversation', {

});

Conversation.findOrCreateConversation = function(user1Id, user2Id) {
    // attempt to find a conversation that's associated with the user IDs passed in.
    return Conversation.find({
      where: {
        user1Id: {
          [Op.or]: [user1Id, user2Id]
        },
        user2Id: {
          [Op.or]: [user1Id, user2Id]
        }
      },
      include: [ conn.models.message ],
    //   order by created at, so messages don't appear on the client out of order
      order: [[ conn.models.message, 'createdAt', 'DESC' ]]
    })
      .then(conversation => {
        if(conversation) {
          return conversation;
        } else {
            // if a conversation doesn't exist, we will create a new conversation
            // with the passed in user ID's
          return Conversation.create({
            user1Id: user1Id,
            user2Id: user2Id
          }, {
            include: [ conn.models.message ],
            order: [[ conn.models.message, 'createdAt', 'DESC' ]]
          });
        }
      });
  };

module.exports = Conversation;
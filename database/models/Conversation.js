const conn = require('../connection/conn');
const { Sequelize } = conn;
const { Op } = Sequelize;

const Conversation = conn.define('conversation', {

},{
  freezeTableName: true
});

Conversation.findOrCreateConversation = function(user1Id, user2Id) {
    // attempt to find a conversation that's associated with the user IDs passed in.
    console.log('in Conversation')
    return Conversation.findOne({
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

Conversation.findAllConversations = (userId) => {
  return Conversation.findAll({
    where: {
      [Op.or]: [{user1Id: userId}, {user2Id: userId}]
    },
    include: [conn.models.message],

    order: [[conn.models.message, 'createdAt', 'DESC']]
  }).then(conversations => {
    if(conversations){
      return conversations
    }
  })
}

module.exports = Conversation;
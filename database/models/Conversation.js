const conn = require('../connection/conn');
const { Sequelize } = conn;
const { Op } = Sequelize;

const Conversation = conn.define('conversation', {
    _id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    user1Id: Sequelize.INTEGER,
    user2Id: Sequelize.INTEGER,
    user1Username: Sequelize.STRING,
    user2Username: Sequelize.STRING,
},{
  freezeTableName: true
});

Conversation.findOrCreateConversation = function(user1, user2) {
    // attempt to find a conversation that's associated with the user IDs passed in.
    console.log('in Conversation')
    return Conversation.findOne({
      where: {
        user1Id: {
          [Op.or]: [user1.id, user2.id]
        },
        user2Id: {
          [Op.or]: [user1.id, user2.id]
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
            console.log(`user1: ${user1.username} user2: ${user2.username}`);
          return Conversation.create({
            user1Id: user1.id,
            user2Id: user2.id,
            user1Username: user1.username,
            user2Username: user2.username,
          }, {
            include: [ conn.models.message ],
            order: [[ conn.models.message, 'createdAt', 'DESC' ]]
          });
        }
      });
  };
  // 

Conversation.findAllConversations = (userId) => {
  return Conversation.findAll({
    where: {
      [Op.or]: [{user1Id: userId}, {user2Id: userId}]
    },
    // include: [conn.models.message],
    include: [{model: conn.models.message,
              include: conn.models.reaction},
            {
              model: conn.models.user,
              as: 'user1',
              attributes: {
                exclude: 'password'
              }
            },
          {
            model: conn.models.user,
            as: 'user2',
            attributes: {
              exclude: 'password'
            }
          }],

    order: [[conn.models.message, 'createdAt', 'DESC']]
  }).then(conversations => {
    if(conversations){
      return conversations
    }
  })
}

module.exports = Conversation;
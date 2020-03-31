const conn = require('../connection/conn');
const { Sequelize } = conn;

const Message = conn.define('message', {
    text: Sequelize.STRING,
    user: Sequelize.JSON,
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
},{
    freezeTableName: true,
});

Message.createMessage = (text, sender, receiver) => {
    return Promise.all([
        Message.create({
            text,
            user: {
                _id: sender.id,
                username: sender.username,
            }
        }),
        
        conn.models.conversation.findOrCreateConversation(sender.id, receiver.id)
    ])
        .then(([message, conversation]) => message.setConversation(conversation))
};

console.log(conn.models);

module.exports = Message;
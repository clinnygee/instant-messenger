const conn = require('./connection/conn');

const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
const User = require('./models/User');

console.log('setting up relations')
console.log('--------------------------------------------------')

User.hasMany(Conversation);
Conversation.belongsTo(User, {as: 'user1'});
Conversation.belongsTo(User, {as: 'user2'});
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
console.log('follow is User')
console.log(User);

module.exports = {
    conn,
    models: {
        Conversation,
        User,
        Message
    }
}
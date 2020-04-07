const conn = require('./connection/conn');

const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
const User = require('./models/User');
const Reaction = require('./models/Reaction');
const Friendship = require('./models/Friendship');
const FriendRequest = require('./models/FriendRequest');

console.log('setting up relations')
console.log('--------------------------------------------------')

User.hasMany(Conversation);
User.hasMany(Friendship, {foreignKey: 'User1'});
User.hasMany(Friendship, {foreignKey: 'User2'});
User.hasMany(FriendRequest, {foreignKey: 'Requestee'});
// User.hasMany(FriendRequest, {foreignKey: 'Requester'});

Conversation.belongsTo(User, {as: 'user1'});
Conversation.belongsTo(User, {as: 'user2'});

Friendship.belongsTo(User, {foreignKey:{name: 'User1'}, as: 'user1'});
Friendship.belongsTo(User, {foreignKey:{name: 'User2'},as: 'user2'});

// FriendRequest.belongsTo(User, {as: 'requester', foreignKey: 'Requester'});
FriendRequest.belongsTo(User, {as: 'requestee', foreignKey:'Requestee'});

Message.belongsTo(Conversation);

Message.hasMany(Reaction);
Reaction.belongsTo(Message);

Conversation.hasMany(Message);
console.log('follow is User')
console.log(User);

module.exports = {
    conn,
    models: {
        Conversation,
        User,
        Message, 
        Reaction,
        Friendship,
        FriendRequest,
    }
}
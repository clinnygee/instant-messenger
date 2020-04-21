const conn = require('./connection/conn');

const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
const User = require('./models/User');
const Reaction = require('./models/Reaction');
const Friendship = require('./models/Friendship');
const FriendRequest = require('./models/FriendRequest');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const PostLike = require('./models/PostLike');

console.log('setting up relations')
console.log('--------------------------------------------------')

User.hasMany(Conversation);
User.hasMany(Post);
Post.belongsTo(User, {foreignKey: 'userId'});
Post.hasMany(Comment);
Comment.belongsTo(Post, {foreignKey: 'postId'});
User.hasMany(Comment);
Comment.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(PostLike);
PostLike.belongsTo(User, {foreignKey: 'userId'});
Post.hasMany(PostLike);
PostLike.belongsTo(Post, {foreignKey: 'postId'});

// User.hasMany(Friendship, {foreignKey: 'User1'});
// User.hasMany(Friendship, {foreignKey: 'User2'});
// User.hasMany(FriendRequest, {foreignKey: 'Requestee'});
User.belongsToMany(User, {as: 'friends', through: Friendship});
User.hasMany(Friendship);
Friendship.belongsTo(User, {foreignKey: 'friendId'});

User.belongsToMany(User, {as:'friendrequests', through: FriendRequest});
User.hasMany(FriendRequest);
FriendRequest.belongsTo(User, {foreignKey: 'friendrequestId'});

// User.belongsToMany(User, {as:'Requester', through: FriendRequest, foreignKey: 'Requester', otherKey: 'id'})
// User.hasMany(FriendRequest, {foreignKey: 'Requester'});

Conversation.belongsTo(User, {as: 'user1'});
Conversation.belongsTo(User, {as: 'user2'});

// Friendship.belongsTo(User, {foreignKey:{name: 'User1'}, as: 'user1'});
// Friendship.belongsTo(User, {foreignKey:{name: 'User2'},as: 'user2'});



// FriendRequest.belongsTo(User, {as: 'requester', foreignKey: 'Requester'});
// FriendRequest.belongsTo(User, {as: 'requestee', foreignKey:'Requestee'});

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
        Post,
        Comment,
        PostLike,
    }
}
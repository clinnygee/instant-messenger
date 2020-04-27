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
const Tag = require('./models/Tag');
const PostTag = require('./models/PostTag');

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


User.belongsToMany(User, {as: 'friends', through: Friendship});
User.hasMany(Friendship);
Friendship.belongsTo(User, {foreignKey: 'friendId'});

User.belongsToMany(User, {as:'friendrequests', through: FriendRequest});
User.hasMany(FriendRequest);
FriendRequest.belongsTo(User, {foreignKey: 'friendrequestId'});



Conversation.belongsTo(User, {as: 'user1'});
Conversation.belongsTo(User, {as: 'user2'});

// Tag.belongsToMany(Post, {through: PostTag, foreignKey: 'tagId'});
// Post.hasMany(PostTag);
// PostTag.belongsTo(Post, {foreignKey: 'postId'});

Post.hasMany(PostTag);
PostTag.belongsTo(Post, {foreignKey: 'postId'});
Tag.hasMany(PostTag);
PostTag.belongsTo(Tag, {foreignKey: 'tagId'});




Message.belongsTo(Conversation);

Message.hasMany(Reaction);
Reaction.belongsTo(Message);

Conversation.hasMany(Message);


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
        Tag, 
        PostTag,
    }
};
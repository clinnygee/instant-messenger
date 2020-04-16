const conn = require('../connection/conn');
const {Sequelize} = conn;

const PostLike = conn.define('postlike', {
    
    
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
}, {
    freezeTableName: true,
});

// Reaction.createReaction = (reaction, messageId, sender) => {
//     return Promise.all([
//         Reaction.create({
//             reaction,
//             user: {
//                 _id: sender.id,
//                 username: sender.username,
//             }
//         }),
//         conn.models.message.findOne({where: {_id: messageId}})
//     ]).then(([reaction, message]) => {
//         console.log(reaction);
//         console.log(message);
//         return reaction.setMessage(message)
//     })
// };

PostLike.createOrRemoveLike = (user, post) => {
    return PostLike.findOne({where: {userId: user.dataValues.id, postId: post.dataValues.id}}).then(postlike => {
        if(postlike instanceof PostLike){
            console.log('postlike exists')
            return postlike.destroy();
        } else {
            return PostLike.create({}).then(newPostLike => {
                newPostLike.setPost(post);
                newPostLike.setUser(user);
                return newPostLike;
            })
        }
    })
}

module.exports = PostLike;
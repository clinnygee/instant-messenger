const conn = require('../connection/conn');
const {Sequelize} = conn;

const Friendship = conn.define('friendship', {
    user1Id: Sequelize.INTEGER,
    user2Id: Sequelize.INTEGER,
    
}, {
    freezeTableName: true,
});

Friendship.createFriendship = (friendRequest) => {
    console.log(friendRequest);
    return Friendship.create({user1Id: friendRequest.Requestee, user2Id: friendRequest.requester}).then(friendship => {
        console.log(friendship);
        return friendship.setUser1(friendRequest.Requestee).then(friendship => {
            return friendship.setUser2(friendRequest.requester);
        })
    })
}

Friendship.findOrCreateFriendship = () => {

}

module.exports = Friendship;
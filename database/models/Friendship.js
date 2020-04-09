const conn = require('../connection/conn');
const {Sequelize} = conn;

const Friendship = conn.define('friendship', {
    // user1Id: Sequelize.INTEGER,
    // user2Id: Sequelize.INTEGER,
    
}, {
    freezeTableName: true,
});

Friendship.createFriendship = (friendRequest) => {
    console.log('------------------Attempting to create FriendRequest---------')
    console.log(friendRequest);
    return Promise.all([
        Friendship.create({userId: friendRequest.userId, friendId: friendRequest.friendrequestId}),
        Friendship.create({userId: friendRequest.friendrequestId, friendId: friendRequest.userId})
    ]).then(([friendship, inverseFriendship]) => {
        console.log(friendship);
        console.log(inverseFriendship);
    })
    
    
    Friendship.create({userId: friendRequest.userId, friendId: friendRequest.friendrequestId}).then(friendship => {
        console.log(friendship);

        // return friendship.setUser1(friendRequest.Requestee).then(friendship => {
        //     return friendship.setUser2(friendRequest.requester);
        // })
    })
}

Friendship.findOrCreateFriendship = () => {

}

module.exports = Friendship;
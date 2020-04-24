const conn = require('../connection/conn');
const {Sequelize} = conn;
const {Op} = Sequelize;

const FriendRequest = conn.define('friendrequest', {
    // requester: Sequelize.INTEGER,
    // requestee: Sequelize.INTEGER,
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    }
}, {
    freezeTableName: true,
});


FriendRequest.findOrCreateRequest = (user1, user2) => {
    console.log('------------------ find or create request');

    return FriendRequest.create({userId: user2.dataValues.id, friendrequestId: user1.dataValues.id});
        
    // return user1.addFriendrequest(user2).then(friendrequest => {
    //     console.log(friendrequest)
    // })
    // return FriendRequest.create({}).then(friendrequest => {
    //     user1.setRequestee(friendrequest);
    //     user2.setRequester(friendrequest);
    // })
}

FriendRequest.findAllRequests = userId => {
    return FriendRequest.findAll({
        where: {requestee: userId}
    });
}

FriendRequest.accept = (friendRequest) => {
    return conn.models.friendship.createFriendship(friendRequest);
};

FriendRequest.decline = (friendRequest) => {
    return conn.models.friendrequest.delete(friendRequest);
};

module.exports = FriendRequest;
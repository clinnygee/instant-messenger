const conn = require('../connection/conn');
const {Sequelize} = conn;
const {Op} = Sequelize;

const FriendRequest = conn.define('friendrequest', {
    requester: Sequelize.INTEGER,
    // requestee: Sequelize.INTEGER,
}, {
    freezeTableName: true,
});

FriendRequest.findOrCreateRequest = (user1, user2) => {
    console.log(user1.dataValues);
    console.log(user2.dataValues)
    return FriendRequest.findOne({
        where: {
            requester: {
                [Op.or]: [user1.dataValues.id, user2.dataValues.id]
            },
            Requestee: {
                [Op.or]: [user1.dataValues.id, user2.dataValues.id]
            }
        }
    }).then(request => {
        if(request){
            return request;
        } else {
            return FriendRequest.create({
                requester: user1.dataValues.id,
                // requestee: user2.dataValues.id,
            }).then(request => {
                
                    return request.setRequestee(user2);
                
                
            })
        }
    })
};

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
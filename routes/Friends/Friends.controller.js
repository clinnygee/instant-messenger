
const {User, Friendship, FriendRequest} = require('../../database').models;

const FriendsController = {
    add(req,res){
        User.findOne({where: {username: req.username}}).then(requester => {
            User.findOne({where: {username: req.params.id}}).then(requestee => {
                FriendRequest.findOrCreateRequest(requester, requestee).then(request => {
                    console.log(request);
                    res.status(200).send();
                })
            })
        })
    },
    delete(req,res){
        Friendship.delete(req.params.id).then(
            res.status(200).send('Friendship Destroyed')
        )
    },

    accept(req,res){
        FriendRequest.findOne({where: {id: req.params.id}}).then(request => {
            FriendRequest.accept(request).then(friendship => {
                res.json(friendship)
            })
        })
    }
};

module.exports = FriendsController;
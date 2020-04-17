const express = require('express');
const router = express.Router();

const withAuth = require('../../middleware/auth');

const {User, Conversation, Message, Reaction, Friendship, FriendRequest, Post, Comment, PostLike} = require('../../database').models;

router.get('/', withAuth, (req, res) => {
    

    User.findOne(
        {where: {username: req.username},
        include: [
            {model: FriendRequest, as: 'friendrequests',
            include:[
                {
                    model: User,
                    attributes: {exclude: ['password']}
                }
            ]},
            {
                model: Friendship,
                include: [
                    {
                        model: User,
                        attributes: {exclude: ['password']}
                    }
                ]
                
            }
            ]})
            .then(userData => {
            res.json(userData)
        });

    
});

router.post('/add/:id', withAuth, (req, res) => {
    console.log(req.username);
    User.findOne({where: {username: req.username}}).then(requester => {
        User.findOne({where: {username: req.params.id}}).then(requestee => {
            FriendRequest.findOrCreateRequest(requester, requestee).then(request => {
                console.log(request);
                res.status(200).send();
            })
        })
    })
});

router.post('/delete/:id', (req, res) => {

});

router.post('/accept/:id', withAuth, (req, res) => {
    console.log(req.params);
    
    FriendRequest.findOne({where: {id: req.params.id}}).then(request => {
        FriendRequest.accept(request).then(friendship => {
            res.json(friendship)
        })
    })
});

module.exports = router;

const express = require('express');
const router = express.Router();

const withAuth = require('../../middleware/auth');
const FriendsController= require('./Friends.controller');

// const {User, Conversation, Message, Reaction, Friendship, FriendRequest, Post, Comment, PostLike} = require('../../database').models;


router.post('/add/:id', withAuth, FriendsController.add);
// router.post('/add/:id', withAuth, (req, res) => {
//     console.log(req.username);
//     User.findOne({where: {username: req.username}}).then(requester => {
//         User.findOne({where: {username: req.params.id}}).then(requestee => {
//             FriendRequest.findOrCreateRequest(requester, requestee).then(request => {
//                 console.log(request);
//                 res.status(200).send();
//             })
//         })
//     })
// });
router.post('/delete/:id', withAuth, FriendsController.delete)
// router.post('/delete/:id', (req, res) => {

//     console.log(req.params.id);
//     Friendship.delete(req.params.id).then(
//         res.status(200).send('Friendship Destroyed')
//     )
//     // Friendship.findOne({where: {id: req.params.id}}).then(friendship => {
//     //     friendship.delete(friendship).then(res.status(200).send('Friend Deleted'));
//     // })
// });

router.post('/accept/:id', withAuth, FriendsController.accept);

// router.post('/accept/:id', withAuth, (req, res) => {
//     console.log(req.params);
    
//     FriendRequest.findOne({where: {id: req.params.id}}).then(request => {
//         FriendRequest.accept(request).then(friendship => {
//             res.json(friendship)
//         })
//     })
// });

module.exports = router;

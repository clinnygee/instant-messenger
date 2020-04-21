const express = require('express');
const router = express.Router();

const {User, Conversation, Message, Reaction, Friendship, FriendRequest, Post, Comment, PostLike} = require('../../database').models;

const withAuth = require('../../middleware/auth');
const upload = require('../../modules/multer');

const singleUpload = upload.single('profile-image');

router.post('/image', withAuth,    (req, res) => {
    // console.log(req);
    console.log(req.body)
    // console.log(req.file.name);

    singleUpload(req, res, function(err, some) {
        if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }   

        User.findOne({where: {username: req.username}}).then(user => {
            const obj = JSON.parse(JSON.stringify(req.body));
            console.log(obj);
            user.update({
                profileImgUrl: req.file.location,
                about: obj['profile-about'],
            }).then(user => {
                res.json(user);
            })
            // 
        });        
      });
});

router.get('/:username', withAuth, (req, res) => {
    User.findOne(
        {
            where: {
                username: req.params.username
            }, attributes: {
                exclude: 'password',
            },
            include: [{
                model: Post,
                
            },
            {
                model: Friendship,
                include: [
                    {
                        model: User,
                        attributes: {exclude: ['password']}
                    }
                ]
                
            },
            {
                model: FriendRequest,
            }

            ]})
            .then(user => {
                res.json(user);
    })
})

module.exports = router;
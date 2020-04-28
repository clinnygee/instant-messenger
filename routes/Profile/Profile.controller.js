const {User, Conversation, Message, Reaction, Friendship, FriendRequest, Post, Comment, PostLike} = require('../../database').models;
const upload = require('../../modules/multer');
const singleUpload = upload.single('profile-image');

const ProfileController = {

    uploadImage(req, res) {
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
    },

    getUserByUsername(req,res){
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
    }
};

module.exports = ProfileController
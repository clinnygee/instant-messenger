const withAuth = require('../../middleware/auth');

const {User, Conversation, Message, Reaction, Friendship, FriendRequest, Post, Comment, PostLike, Tag, PostTag} = require('../../database').models;

const upload = require('../../modules/multer');

const postPhotoUpload = upload.single('post-image');

const PostsController = {

    findAll(req,res){
        console.log(req.headers);
        User.findOne({where:{username: req.username},include: [{model: Friendship}]}).then(UserAndFriends=>{
            let idArray = [UserAndFriends.id];
            UserAndFriends.friendships.forEach(friend => idArray.push(friend.friendId));
            console.log(idArray);
            Post.findAll({where: {userId: idArray}, include: [
                {
                    model: User,
                    attributes: {
                        exclude: 'password'
                    }
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: {
                            exclude: 'password'
                        }
                    }
                },
                {
                    model: PostLike,
                    include: {
                        model: User,
                        attributes: {
                            exclude: 'password'
                        }
                    }
                },
                {
                    model: PostTag,
                    include: {
                        model: Tag,
                    }
                },
            ],
                order: [
                    ['createdAt', 'DESC']
                ]    
            }).then(posts => {
                // console.log(posts)
                res.json(posts);
            })
        })
        
    },

    async create(req,res){
        console.log('Hit /feed/create')

        postPhotoUpload(req, res, function(err, some) {
            if (err) {
              return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
            }

            User.findOne({where: {username: req.username}}).then(user => {
                const obj = JSON.parse(JSON.stringify(req.body));
                // console.log(obj);
                console.log(obj.tags);
                Post.create({contentUrl: req.file.location, text: obj['post-body']}).then(async (post) => {
                    post.setUser(user);
                    // res.status(200).send('Success!');
                    if(obj.tags){
                        let tags = obj.tags.split(',');
                        console.log(tags);
                        tagDbArray = [];
                        await tags.forEach( async (tag) => {
                            let tagToPush = await Tag.findOneOrCreate(tag);
                            console.log(await tagToPush);
                            let postTag = await PostTag.create({postId: post.id, tagId: tagToPush.dataValues.id});
                            console.log(await tagToPush);
                            console.log(await postTag);
                            tagDbArray.push(tagToPush);
                        });

                    }

                }).then(post => {
                    res.status(200).send('Success!');
                });


            });        
          });
    },
    async edit(req,res){
        
        User.findOne({where: {username: req.username}}).then(user => {
            Post.findOne({where: {id: req.params.id}, include:[{model: PostTag, include:[{model: Tag}]}]}).then(async post => {
                if(user.id !== post.userId){
                    console.log('Not the same user')
                    res.status(403).send('You cannot edit a post that you did not create!');
                } else {
                    console.log(post)
                    // delete all old post tags
                    post.posttags.forEach(posttag => {
                        
                        posttag.destroy();
                    });
                    if(req.body.tags.length > 0){
                    let tagDbArray = [];
                    let tags = req.body.tags;
                        await tags.forEach( async (tag) => {
                            let tagToPush = await Tag.findOneOrCreate(tag);
                            console.log(await tagToPush);
                            let postTag = await PostTag.create({postId: post.id, tagId: tagToPush.dataValues.id});
                            console.log(await tagToPush);
                            console.log(await postTag);
                            tagDbArray.push(tagToPush);
                        });}
                        post.text = req.body.postBody;

                        post.save();

                        res.status(200).send('Post updated successfully!')
                    
                }
            })
        })
    },

    findById(req,res){
        Post.findOne(
            {where: 
                {
                    id: req.params.id
                },
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: 'password'
                        }
                    },
                    {
                        model: Comment,
                        include: {
                            model: User,
                            attributes: {
                                exclude: 'password'
                            }
                        }
                    },
                    {
                        model: PostLike,
                        include:{
                            model: User,
                            attributes: {
                                exclude: 'password'
                            }
                        }
                        // include:{
                        //     model: Tag,
                        // }
                    }
                ]
            }).then(post => {
            res.json(post);
        })
    },

    deleteById(req,res){
        Post.findOne({where: {id: req.params.id},
            include: [{model: User}]
        }).then(post => {
            console.log(post);
            if(post.user.username === req.username){
                post.destroy();
                res.status(200).send('Post Deleted!');
            } else if(!post){
                res.status(400).send('Post Not Found')
            } else {
                res.status(401).send('You can only delete your own posts.')
            }
        })
    },

    createComment(req, res){
        User.findOne({where: {username: req.username}}).then(user => {
            Post.findOne({where: {id: req.params.id}}).then(post => {
                Comment.create({text: req.body.text}).then(comment => {
                    comment.setPost(post);
                    comment.setUser(user);
                                    
                    res.status(200).send('Comment Added Successfully!')
                })
            })
        })
    },

    deleteComment(req, res){
        Comment.findOne({where: {id: req.params.commentId}}).then(comment => {
            if(comment){
                comment.destroy();
                res.status(200).send('Comment Destroyed');
            } else {
                res.status(400).send('Failed to destroy comment');
            }
        })
    },

    createLike(req, res){
        User.findOne({where: {username: req.username}}).then(user => {
            Post.findOne({where: {id: req.params.id}}).then(post => {
                PostLike.createOrRemoveLike(user, post).then(postlike => {
                    console.log(postlike);
                    if(postlike !== 'Postlike Destroyed'){
                        console.log('this is an instance of postlike')
                        PostLike.findOne({where: {id: postlike.id}, include: [{model: User}]}).then(postlikeAndUser => {
                            console.log(postlikeAndUser)
                            res.status(200).json(postlikeAndUser)
                        })
                    } else {
                        res.status(200).json([]);
                    }
                    
                })
            })
        })
    },

    findByTag(req, res){
        let searchTag = req.params.tag;
    console.log(searchTag);
    Tag.findOne({where: {tag: searchTag}}).then(tag => {
        PostTag.findAll(
            {where: 
                {tagId: tag.id},
                include: {
                    model: Post,
                    include: [
                        {
                            model: User,
                            attributes: {
                                exclude: 'password'
                            }
                        },
                        {
                            model: Comment,
                            include: {
                                model: User,
                                attributes: {
                                    exclude: 'password'
                                }
                            }
                        },
                        {
                            model: PostLike,
                            include: {
                                model: User,
                                attributes: {
                                    exclude: 'password'
                                }
                            }
                        },
                        {
                            model: PostTag,
                            include: {
                                model: Tag,
                            }
                        },
                    ]
                }
            
            },
                
            ).then(posttags => {
                res.json(posttags);
        })
    })
    }
};

module.exports = PostsController;
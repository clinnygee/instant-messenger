const express = require('express');
const router = express.Router();
const withAuth = require('../../middleware/auth');

const {User, Conversation, Message, Reaction, Friendship, FriendRequest, Post, Comment, PostLike, Tag, PostTag} = require('../../database').models;

const upload = require('../../modules/multer');


router.get('/', withAuth, (req,res) => {
    console.log('hit the posts route');
    console.log('---------------')
    Post.findAll({include: [
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
            // attributes: {
            //     exclude:''
            // },
            include: {
                model: Tag,
            }
        },
        // {
        //     model: Tag,
        // }
    ]}).then(posts => {
        console.log(posts);
        res.json(posts);
    })
});
// 
const postPhotoUpload = upload.single('post-image');

router.post('/create', withAuth, async (req, res) => {
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
                    // console.log(tagDbArray);
                    // console.log(tagDbArray.length)
                    // tagDbArray.forEach(async tag => {
                    //     await PostTag.create({postId: post.id , tagId: tag.id})
                    // });
                }
                
            }).then(post => {
                res.status(200).send('Success!');
            });
            // if(obj.tags){
            //     let tags = obj.tags.split(',');
            //     console.log(tags);
            //     tagDbArray = [];
            //     tags.forEach(tag => {
            //         let tagToPush = await Tag.findOneOrCreate(tag);
            //         tagDbArray.push(tagToPush);
            //     })
            // }
            // Post.create({contentUrl: req.file.location, text: obj['post-body']}).then(post => {
            //     post.setUser(user);
            //     res.status(200).send('Success!');
            // })
            
        });        
      });
});

router.get('/:id', withAuth, (req, res) => {
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
                    // include:{
                    //     model: Tag,
                    // }
                }
            ]
        }).then(post => {
        res.json(post);
    })
})

router.delete('/:id', withAuth, (req,res) => {
    // call Post.delete() which will return an error if if req.username !=
    console.log('hit the delete route')
    console.log(req.params.id);

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
});

router.put('/:id', withAuth, (req, res) => {
    // for editing post
})

router.post('/:id/comments', withAuth, (req,res) => {
    console.log('hit /posts/:id/comments');
    console.log(req.body);
    User.findOne({where: {username: req.username}}).then(user => {
        Post.findOne({where: {id: req.params.id}}).then(post => {
            Comment.create({text: req.body.text}).then(comment => {
                comment.setPost(post);
                comment.setUser(user);
                                
                res.status(200).send('Comment Added Successfully!')
            })
        })
    })
    
});

router.post('/:id/like', withAuth, (req,res) => {
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
})

router.delete('/:id/comment/:commentId', (req,res) => {
    
})

router.put('/:id/comment/:commentId', (req, res) => {

});

router.get('/search/:tag', (req, res) => {
    console.log('--------------------');
    console.log('HIT THE POST ROUTE')
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
                            // attributes: {
                            //     exclude:''
                            // },
                            include: {
                                model: Tag,
                            }
                        },
                    ]
                }
            
            },
                
            ).then(posttags => {
                res.json(posttags);
            console.log(posttags);
        })
    })
})

module.exports = router;


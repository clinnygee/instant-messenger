const express = require('express');
const router = express.Router();

const withAuth = require('../../middleware/auth');
const PostsController= require('./Posts.controller');


router.get('/', withAuth, PostsController.findAll);


router.post('/create', withAuth, PostsController.create);



router.get('/:id', withAuth, PostsController.findById);



router.delete('/:id', withAuth, PostsController.deleteById);



router.put('/edit/:id', withAuth, PostsController.edit );

router.post('/:id/comments', withAuth, PostsController.createComment);



router.post('/:id/like', withAuth, PostsController.createLike);



router.delete('/comment/:commentId', withAuth, PostsController.deleteComment);

router.put('/:id/comment/:commentId', (req, res) => {

});

router.get('/search/:tag', withAuth, PostsController.findByTag);



module.exports = router;


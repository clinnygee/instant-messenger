const express = require('express');
const router = express.Router();
const {User, Conversation, Message, Reaction, Friendship, FriendRequest, Post, Comment, PostLike} = require('../../database').models;

const withAuth = require('../../middleware/auth');
const SearchController = require('./Search.controller');


router.get('/:searchTerm', withAuth, SearchController.posts);
router.get('/search/:searchTerm', withAuth, SearchController.tags);



module.exports = router;
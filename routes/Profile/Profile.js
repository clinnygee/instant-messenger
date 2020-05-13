const express = require('express');
const router = express.Router();


const withAuth = require('../../middleware/auth');

const ProfileController = require('./Profile.controller');

router.post('/about', withAuth, ProfileController.uploadAbout)
router.post('/image', withAuth, ProfileController.uploadImage);
router.get('/:username', withAuth, ProfileController.getUserByUsername);



module.exports = router;
const express = require('express');
const post_controller = require('../controllers/post_controller');
const router = express.Router();

router.post('/create-post',post_controller.createPost);



module.exports = router;
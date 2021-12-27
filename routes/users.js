const express = require('express');
const router =  express.Router();


const users_controller = require('../controllers/users_controller');

router.get('/profile',users_controller.profile);
router.get('/signup',users_controller.signup);
router.get('/signin',users_controller.signin);
router.post('/create-contact',users_controller.createUser);
router.post('/create-session',users_controller.createSession)


module.exports = router;
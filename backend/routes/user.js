const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.get('/', userCtrl.getUser);
router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);

module.exports = router;
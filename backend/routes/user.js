const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middlewares/multer-config');


router.get('/:id', userCtrl.getUser);
router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);
router.post('/images/:id', multer, userCtrl.addUserAvatar)


module.exports = router;
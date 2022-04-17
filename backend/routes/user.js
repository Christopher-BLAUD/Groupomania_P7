const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth')


router.get('/:id', userCtrl.getUser);
router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);
router.post('/images/:id', auth, multer, userCtrl.addUserAvatar)
router.delete('/delete-account/:id', auth, userCtrl.deleteUserAccount)


module.exports = router;
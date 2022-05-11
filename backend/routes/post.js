const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

const multer = require('../middlewares/multer-config')
const auth = require('../middlewares/auth');

router.get('/user/:id', postCtrl.getPosts);
router.post('/create/:userId', auth, multer, postCtrl.createPost);
router.delete('/delete/:id', auth, postCtrl.deletePost)

module.exports = router;
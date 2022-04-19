const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');

const multer = require('../middlewares/multer-config')
const auth = require('../middlewares/auth');

router.post('/post/:postId/user/:userId', likeCtrl.sendLike);
router.delete('/post/:postId/user/:userId', likeCtrl.sendUnlike)

module.exports = router;
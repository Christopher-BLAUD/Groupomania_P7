const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');

const auth = require('../middlewares/auth');

router.get('post/:postId', likeCtrl.getLikes);
router.get('/post/:postId/user/:userId', likeCtrl.getOneLike)
router.post('/post/:postId/user/:userId', likeCtrl.sendLike);
router.delete('/post/:postId/user/:userId', likeCtrl.sendUnlike);

module.exports = router;
const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment')

const auth = require('../middlewares/auth');

router.get('/post/:id', commentCtrl.getAllComments);
router.get('/count/:id', commentCtrl.commentsCount);
router.post('/create', commentCtrl.createComment);
router.delete('/delete/:id', commentCtrl.deleteComment);


module.exports = router;
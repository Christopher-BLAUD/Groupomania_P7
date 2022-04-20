const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment')

const auth = require('../middlewares/auth');

router.get('/post/:id', commentCtrl.getAllComments);
router.post('/create', auth, commentCtrl.createComment);
router.delete('/delete/:id', auth, commentCtrl.deleteComment);


module.exports = router;
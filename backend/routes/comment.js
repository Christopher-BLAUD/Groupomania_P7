const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment')

const auth = require('../middlewares/auth');

router.get('/post/:id', commentCtrl.getAllComments);
router.post('/create', commentCtrl.createComment);


module.exports = router;
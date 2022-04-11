const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

const multer = require('../middlewares/multer-config')
const auth = require('../middlewares/auth');

router.get('/', postCtrl.getPost);
router.post('/create/:id', auth, multer, postCtrl.createPost);
/* router.post('/create', multer, postCtrl.createPost) */
/* router.post('/message', postCtrl.createMessage) */

module.exports = router;
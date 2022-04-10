const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer-config')

router.get('/', postCtrl.getPost);
router.post('/create/:id', multer, postCtrl.createPost)
/* router.post('/message', postCtrl.createMessage) */

module.exports = router;
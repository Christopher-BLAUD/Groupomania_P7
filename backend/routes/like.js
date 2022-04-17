const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');

const multer = require('../middlewares/multer-config')
const auth = require('../middlewares/auth');

router.post('/:id', likeCtrl.sendLike);

module.exports = router;
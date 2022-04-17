const sequelize = require('../utils/database');
const Like = require('../models/like')


exports.sendLike = (req, res, next) => {
    Like.create({
        hasLiked: true,
        userId: req.body.userId,
        postId: req.params.id
    })
    .then(like => res.status(201).json(like))
    .catch(error => res.status(500).json(error)) 
}

const sequelize = require('../utils/database');
const Like = require('../models/like')


exports.sendLike = (req, res, next) => {
    console.log(req.body.hasLiked)
    Like.create({
        hasLiked: req.body.hasLiked,
        userId: parseInt(req.params.userId, 10),
        postId: parseInt(req.params.postId, 10)
    })
    .then(like => res.status(201).json({message: 'Le post a bien été liké !', like}))
    .catch(error => res.status(500).json(error)) 
}

exports.sendUnlike = (req, res, next) => {
    Like.destroy({
        where: {
            userId: req.params.userId,
            postId: req.params.postId
        }
    })
    .then(like => res.status(200).json({message: 'Like supprimé avec succés', like}))
    .catch(error => res.status(500).json(error))
}
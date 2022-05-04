const sequelize = require('../utils/database');
const Like = require('../models/like')


exports.sendLike = (req, res, next) => {
    Like.create({
        userId: parseInt(req.params.userId, 10),
        postId: parseInt(req.params.postId, 10)
    })
    .then(like => res.status(201).json({message: 'Le post a été liké !'}))
    .catch(error => res.status(500).json(error)) 
}

exports.sendUnlike = (req, res, next) => {
    Like.destroy({
        where: {
            userId: req.params.userId,
            postId: req.params.postId
        }
    })
    .then(like => res.status(200).json({message: 'Like supprimé avec succés'}))
    .catch(error => res.status(500).json(error))
}

exports.getLikes = (req, res, next) => {
    Like.findAll({
        where: {
            postId: req.params.postId
        }   
    })
        .then(like => res.status(200).json(like))
        .catch(error => res.status(500).json({error}))
}

exports.getOneLike = (req, res, next) => {
    Like.findOne({
        where: {
            userId: req.params.userId,
            postId: req.params.postId
        }
    })
    .then(like => res.status(200).json(like))
    .catch(error => res.status(404).json(error))
}
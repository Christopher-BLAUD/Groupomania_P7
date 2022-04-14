const sequelize = require('../utils/database');
const Comment = require('../models/comment');
const User = require('../models/user')

exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        where: {
          postId: req.params.id
        }
    })
    .then(res => res.status(200).json(res))
    .catch(error => res.status(404).json(error))

};

exports.createComment = (req, res, next) => {
    Comment.create({
        content: req.body.comment,
        userId: req.body.userId,
        postId: req.body.postId
    })
    .then(comment => res.status(201).json({message: "Commentaire ajouté avec succès !", comment}))
    .catch(error => res.status(500).json(error))
};
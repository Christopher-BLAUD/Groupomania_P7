const sequelize = require('../utils/database');
const Comment = require('../models/comment');
const User = require('../models/user')


// Affiche tous les commentaires du post concerné
exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        where: {
          postId: req.params.id
        },
        include: [{
            model: User,
            required: true
        }],
        order: [['createdAt', 'ASC']]
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(404).json(error))

};


// Créer un nouveau commentaire 
exports.createComment = (req, res, next) => {
    Comment.create({
        content: req.body.comment,
        userId: req.body.userId,
        postId: req.body.postId
    })
    .then(comment => res.status(201).json({message: "Commentaire ajouté avec succès !", comment}))
    .catch(error => res.status(500).json(error))
};


// Supprime un commentaire
exports.deleteComment = (req, res, next) => {
    if(req.body.isAdmin){
        Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({message: "Commentaire supprimé"}))
        .catch(error => res.status(500).json(error)) 
    }
    else {
        Comment.destroy({
            where: {
                id: req.params.id,
                userId: req.body.userId
            }
        })
        .then(() => res.status(200).json({message: "Commentaire supprimé"}))
        .catch(error => res.status(500).json(error))
    }
}

const sequelize = require('../utils/database');
const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like')


exports.getPost = (req, res, next) => {
    Post.findAll({
        include: [
            {
                model: User,
                require: true
            }
    ],
        order: [['createdAt', 'DESC']]
    })
    .then(posts => res.status(200).json(posts))
    .catch((error) => res.status(500).json(error))
    
}

/* exports.getPostLike = (req, res, next) => {
    Post.findAll({
        include: [
            {
                model: Like,
                require: true
            }
    ]
    })
    .then(postLikes => res.status(200).json(postLikes))
    .catch((error) => res.status(500).json(error))
} */

exports.createPost = (req, res, next) => {
sequelize.sync()
    .then(newPost => {
        return Post.create({
            content: req.body.content,
            image: `${req.protocol}://${req.get('host')}/api/post/images/${req.file.filename}`,
            userId: req.params.id    
        })
    })
    .then(post => res.status(201).json({message: 'Publication avec photo envoyée avec succés', post}))
    .catch(error => {res.status(500).json(error)})
}

exports.deletePost = (req, res, next) => {
    Post.destroy({
        where: {
            id: req.params.id,
            userId: req.body.userId
        }
    })
    .then(() => res.status(200).json({message: 'Le post a été supprimé !'}))
    .catch(error => res.status(500).json(error))
}

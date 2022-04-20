const sequelize = require('../utils/database');
const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');
const Comment = require('../models/comment');

exports.getPost = (req, res, next) => {
    Post.findAll({
        attributes: {
            include: [
                [sequelize.fn('COUNT', sequelize.col('comments.id')), 'commentsCount'],
                [sequelize.fn('COUNT', sequelize.col('likes.id')), 'likesCount']
            ]
        }
        ,
        include: [
            {
                model: Comment,
                attributes: ['userId']
            },
            {
                model: Like,
                attributes: ['userId']
            },
            {
                model: User,
                attributes: ['firstname', 'lastname', 'imageUrl']
            }
        ],
        order: [['createdAt', 'DESC']],
        group: ['post.id']
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => console.log(error))
}


exports.createPost = (req, res, next) => {
    if(req.file){
        Post.create({
                content: req.body.content,
                image: `${req.protocol}://${req.get('host')}/api/post/images/${req.file.filename}`,
                userId: req.params.id    
        })
    .then(post => res.status(201).json({message: 'Publication avec photo envoyée avec succés', post}))
    .catch(error => {res.status(500).json(error)})
    }
    else {
        Post.create({
            content: req.body.content,
            userId: req.params.id    
    })
.then(post => res.status(201).json({message: 'Message publié avec succés', post}))
.catch(error => {res.status(500).json(error)})
    }
}

exports.deletePost = (req, res, next) => {
    if(req.body.isAdmin) {
        Post.destroy({
            where: {
                id: req.params.id,
            }
        })
        .then(() => res.status(200).json({message: 'Le post a été supprimé !'}))
        .catch(error => res.status(500).json(error))
    }
    else {
        Post.destroy({
            where: {
                id: req.params.id,
                userId: req.body.userId
            }
        })
        .then(() => res.status(200).json({message: 'Le post a été supprimé !'}))
        .catch(error => res.status(500).json(error))
    }
}

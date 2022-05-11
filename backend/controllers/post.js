const sequelize = require('../utils/database');
const { QueryTypes } = require('sequelize');
const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');
const Comment = require('../models/comment');

// Affiche les 6 derniers post avec les infos utilisateur, commentaire et like
exports.getPosts = (req, res, next) => {
    sequelize.query(`
    SELECT p.*,
    user.firstname AS userFirstname,
    user.imageUrl AS userAvatar,
    user.lastname AS userLastname,
    COUNT(DISTINCT c.id) AS commentsCount,
    COUNT(DISTINCT l.id) AS likesCount,
    (
        SELECT l2.userId 
        FROM likes l2
        WHERE l2.userId = ${req.params.id}
        AND l2.postId = p.id
    ) AS userWhoLiked,
    (
        SELECT c2.userId
        FROM comments c2
        WHERE c2.userId = ${req.params.id}
        AND c2.postId = p.id
    ) AS userWhoCommented
    FROM posts p
    LEFT JOIN comments c
    ON p.id = c.postId
    LEFT JOIN likes l 
    ON p.id = l.postId
    INNER JOIN users user
    ON p.userId = user.id
    GROUP BY p.id
    ORDER BY p.createdAt DESC
    LIMIT 6
    `, {
        type: QueryTypes.SELECT
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json(error))
}

// Créer un nouveau post
exports.createPost = (req, res, next) => {
    if(req.file){
        Post.create({
                content: req.body.content,
                image: `${req.protocol}://${req.get('host')}/api/post/images/${req.file.filename}`,
                userId: req.params.userId    
        })
    .then(post => res.status(201).json({message: 'Publication avec photo envoyée avec succés', post}))
    .catch(error => {res.status(500).json(error)})
    }
    else {
        Post.create({
            content: req.body.content,
            userId: req.params.userId    
    })
.then(post => res.status(201).json({message: 'Message publié avec succés', post}))
.catch(error => {res.status(500).json(error)})
    }
}


// Supprime un post
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

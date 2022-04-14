const sequelize = require('../utils/database');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
require('dotenv').config();



// Affiche le mur de publication avec les informations utilisateurs
exports.getUser = (req, res, next) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => res.status(200).json(user))
    .catch((error) => res.status(500).json(error))
}


// Inscrisption de l'utilisateur 
exports.signUp = (req, res, next) => {
sequelize.sync()
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        return User.create({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            password: hash
        })
        console.log(result);
    })
    .then(user => {
        res.status(201).json({message: "Utilisateur créé avec succès !", user})
    })
    .catch((err) => {
        console.log(err);
    });
}



// Connexion de l'utilisateur et redirection vers le mur de publication
exports.login = (req, res, next) => {
    User.findOne({ where: {email: req.body.email}})
    .then(user => {
        if(!user){
            return res.status(401).json({error: 'Utlisateur inexistant'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    return res.status(401).json({error: 'Mot de passe incorrect !'});
                }
                
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        {userId: user.id},
                        `${process.env.TOKEN_SECRET}`,
                        {expiresIn: '24h'}
                    )
                });
                
            })
            .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}))
};


// Ajout d'une image de profil
exports.addUserAvatar =  (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    User.update({
        imageUrl:`${req.protocol}://${req.get('host')}/api/user/images/${req.file.filename}`
    }, {
        where: {id: req.params.id}
    })
        .then(user => res.status(200).json({message: 'Image uploadée avec succès !'}))
        .catch((error) => {res.status(500).json(error)})
}


// Suppression du compte utilisateur 
exports.deleteUserAccount = (req, res, next) => {
    User.destroy({
        where: {
            id: req.params.id
        },
        includes: {
            model: Post
        }
    })
        .then(user => res.status(200).json({message: 'Le compte a bien été supprimé', user}))
        .catch((error) => {res.status(500).json(error)})
}
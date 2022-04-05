const sequelize = require('../utils/database');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUser = (req, res, next) => {
    const user = {
        id: 1,
        firstname: 'Christopher',
        lastname: 'BLAUD',
        imgProfil: 'https://media-exp1.licdn.com/dms/image/C5603AQHV-muhE2ajfQ/profile-displayphoto-shrink_200_200/0/1607179792889?e=1654732800&v=beta&t=dRM6yJxORZnXwftIec3jhkpMpjcFI3RUW5lmCKO26uU'

    };
    res.status(200).json(user);
}


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
const sequelize = require('../utils/database');
const Post = require('../models/post');
const User = require('../models/user');


/* exports.getPost = (req, res, next) => {
    const post = [
        {
            id: 1,
            userFullname: 'Will SMITH',
            userProfilImg: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg',
            legend: 'COOoOoOorection !',
            image: 'https://images.bfmtv.com/JcJNhhdOT-hdElZc7VBPK_RGZ5g=/0x106:2048x1258/640x0/images/La-gifle-de-Will-Smith-a-Chris-Rock-aux-Oscars-1380112.jpg',
            like: 3345448,
            comments: [
                {
                    id: 1,
                    userName: 'Christopher BLAUD',
                    userPicture: 'https://media-exp1.licdn.com/dms/image/C5603AQHV-muhE2ajfQ/profile-displayphoto-shrink_200_200/0/1607179792889?e=1654732800&v=beta&t=dRM6yJxORZnXwftIec3jhkpMpjcFI3RUW5lmCKO26uU',
                    message: `Une gifle ? Perso j'aurais fermé la main ...`
                },
                {
                    id: 2,
                    userName: 'Chris Rock',
                    userPicture: 'https://file1.closermag.fr/var/closermag/storage/images/1/3/7/0/5/13705703/chris-rock-frappe-par-will-smith-encore-sonne-brise-silence-apres-son-humiliation-publique-aux-oscars.jpeg?alias=original',
                    message: `C'est mon dentiste qui va être content ...`
                }
            ]
        },
        {
            id: 2,
            userFullname: 'Vladimir POUTINE',
            userProfilImg: 'https://www.challenges.fr/assets/img/2018/09/11/cover-r4x3w1000-5b978f41e1edf-sipa-ap22227656-000003.jpg',
            legend: `Le début d'une grande amitié`,
            image: 'https://static.lexpress.fr/medias_12059/w_2048,h_1146,c_crop,x_0,y_416/w_1000,h_563,c_fill,g_north/v1556269023/le-dirigeant-nord-coreen-kim-jong-un-g-et-le-president-russe-vladimir-poutine-a-vladivostok-en-russie-le-25-avril-2019_6174288.jpg',
            like: 4,
            comments: [
                {
                    id: 1,
                    userName: 'Emmanuel MACRON',
                    userPicture: 'https://resize-parismatch.lanmedia.fr/r/375,250,forcex,center-middle/img/var/pm/public/media/image/2022/04/02/10/Avant-son-meeting-a-La-Defense-Macron-un-president-impopulaire-mais-mecaniquement-approuve.jpg?VersionId=pEzhuBQyw9Y7RTsvRSRAH52tb2gRWJkq',
                    message: `Et moi ?`
                }
            ]
        },
        {
            id: 3,
            userFullname: 'Christopher BLAUD',
            userProfilImg: 'https://media-exp1.licdn.com/dms/image/C5603AQHV-muhE2ajfQ/profile-displayphoto-shrink_200_200/0/1607179792889?e=1654732800&v=beta&t=dRM6yJxORZnXwftIec3jhkpMpjcFI3RUW5lmCKO26uU',
            legend: `Mon jolie petit chat ... Oui oui j'aime les chats`,
            image: 'https://cache.cosmopolitan.fr/data/photo/w1200_h630_c17/67/chat.jpg',
            like: 158,
            comments: [
                {
                    id: 1,
                    userName: 'Will SMITH',
                    userPicture: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/TechCrunch_Disrupt_2019_%2848834434641%29_%28cropped%29.jpg',
                    message: `C'est vrai qu'il est mignon`
                },
                {
                    id: 2,
                    userName: 'Kim Jong-un',
                    userPicture: 'https://weaponews.com/images/2018/05/17/335cc6d7739f904a5810d98fc281ade4.jpg',
                    message: `Ca me donne faim tiens !`
                }
            ]
        }
    ];
    res.status(200).json(post);
}; */

exports.getPost = (req, res, next) => {
    Post.findAll()
    .then(post => res.status(200).json(post))
    .catch((error) => res.status(500).json(error))
}

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

/* exports.createMessage = (req, res, next) => {
    sequelize.sync()
    .then(newMessage => {
        return Post.create({
            content: req.body.content
        })
    })
    .then(message => res.status(201).json({message: 'Publication envoyée avec succés', post}))
    .catch(error => {res.status(500).json(error)})
} */

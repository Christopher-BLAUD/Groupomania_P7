exports.getUser = (req, res, next) => {
    const user = {
        id: 1,
        firstname: 'Christopher',
        lastname: 'BLAUD',
        imgProfil: 'https://media-exp1.licdn.com/dms/image/C5603AQHV-muhE2ajfQ/profile-displayphoto-shrink_200_200/0/1607179792889?e=1654732800&v=beta&t=dRM6yJxORZnXwftIec3jhkpMpjcFI3RUW5lmCKO26uU'

    };
    res.status(200).json(user);
    next();
}
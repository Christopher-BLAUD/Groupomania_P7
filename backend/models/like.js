/* const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Like = sequelize.define('like', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    hasLiked: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    }
});



module.exports = Like; */
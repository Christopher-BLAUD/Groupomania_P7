const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

// Modèle like
const Like = sequelize.define('like', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});



module.exports = Like;
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    like: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

module.exports = Post;
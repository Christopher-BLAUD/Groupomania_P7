const Sequelize = require('sequelize');

const sequelize = new Sequelize("groupo", "root", "ouhlala.2014", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
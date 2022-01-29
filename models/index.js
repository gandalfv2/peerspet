const { Sequelize } = require('sequelize');
const appConfig = require('../config')
const db = new Sequelize({
    dialect: 'sqlite',
    storage: appConfig.DB_URI
});

module.exports = db;

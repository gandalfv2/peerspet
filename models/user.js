const {DataTypes} = require('sequelize')
const sequelize = require('./index');

const User = sequelize.define('User', {

id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},

username: {
    type: DataTypes.STRING,
    allowNull: false
},

password: {
    type: DataTypes.STRING,
    allowNull: false
},
salt: {
    type: DataTypes.CHAR,
    allowNull: false
}
}, {
indexes: [{ unique: true, fields: ['id'] }],
tableName: 'users'
});

module.exports = User;

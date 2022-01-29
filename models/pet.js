const {DataTypes} = require('sequelize')
const sequelize = require('./index');
const Pet = sequelize.define('Pet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    sold_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    purchased_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        
    },
}, {
    indexes: [{ unique: true, fields: ['id'] }],
    tableName: 'pets'
});



module.exports = Pet;

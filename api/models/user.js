const { DataTypes } = require('sequelize');

module.exports = sequelize =>
    sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    });
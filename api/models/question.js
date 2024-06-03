const { DataTypes } = require('sequelize');
const { Answer } = require('../../db');

module.exports = sequelize =>
    sequelize.define('Question', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        variant: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        answer_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: Answer,
                key: 'id',
            },
        },
    });
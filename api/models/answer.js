const { DataTypes } = require('sequelize');
const { Question } = require('../../db');

module.exports = sequelize =>
    sequelize.define('Answer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        question_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: Question,
                key: 'id',
            },
        },
    });
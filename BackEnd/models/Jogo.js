const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Jogo = sequelize.define(
    "Jogo",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: { notEmpty: { msg: "O título do jogo é obrigatório." } },
        },
        desenvolvedora: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: { notEmpty: { msg: "A desenvolvedora é obrigatória." } },
        },
        ano: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "Informe um ano válido." },
                min: { args: [1970], msg: "O ano deve ser 1970 ou posterior." },
                max: { args: [2100], msg: "O ano deve ser no máximo 2100." },
            },
        },
        preco: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: { min: { args: [0], msg: "O preço não pode ser negativo." } },
        },
    },
    { tableName: "jogos", timestamps: false }
);

module.exports = Jogo;

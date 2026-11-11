const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pessoa = sequelize.define(
    "Pessoa",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: { notEmpty: { msg: "O nome da pessoa é obrigatório." } },
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: { isEmail: { msg: "Informe um e-mail válido." } },
        },
    },
    { tableName: "pessoas", timestamps: false }
);

module.exports = Pessoa;

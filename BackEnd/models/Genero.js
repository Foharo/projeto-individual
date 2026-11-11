const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Genero = sequelize.define(
    "Genero",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: { notEmpty: { msg: "O nome do gênero é obrigatório." } },
        },
    },
    { tableName: "generos", timestamps: false }
);

module.exports = Genero;

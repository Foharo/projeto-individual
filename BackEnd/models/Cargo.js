const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cargo = sequelize.define(
    "Cargo",
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
            validate: { notEmpty: { msg: "O nome do cargo é obrigatório." } },
        },
    },
    { tableName: "cargos", timestamps: false }
);

module.exports = Cargo;

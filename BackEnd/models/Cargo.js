const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cargo = sequelize.define(
    "Cargo",
    {
        id_car: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nome_car: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: "cargo",
        timestamps: false,
    },
);

module.exports = Cargo;

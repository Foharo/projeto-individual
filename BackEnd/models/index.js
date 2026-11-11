const sequelize = require("../config/database");
const Cargo = require("./Cargo");
const Pessoa = require("./Pessoa");

// Relacionamento: um cargo possui várias pessoas; cada pessoa tem um cargo.
// RESTRICT impede excluir um cargo que ainda esteja em uso.
Cargo.hasMany(Pessoa, { foreignKey: "cargoId", as: "pessoas", onDelete: "RESTRICT" });
Pessoa.belongsTo(Cargo, { foreignKey: { name: "cargoId", allowNull: false }, as: "cargo" });

module.exports = { sequelize, Cargo, Pessoa };

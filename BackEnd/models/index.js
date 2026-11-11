const sequelize = require("../config/database");
const Genero = require("./Genero");
const Jogo = require("./Jogo");

// Relacionamento: um gênero possui vários jogos; cada jogo pertence a um gênero.
// RESTRICT impede excluir um gênero que ainda esteja em uso.
Genero.hasMany(Jogo, { foreignKey: "generoId", as: "jogos", onDelete: "RESTRICT" });
Jogo.belongsTo(Genero, { foreignKey: { name: "generoId", allowNull: false }, as: "genero" });

module.exports = { sequelize, Genero, Jogo };

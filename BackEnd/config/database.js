const { Sequelize } = require("sequelize");

// Configuração do PostgreSQL.
// Pode ser alterada por variáveis de ambiente (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT).
const sequelize = new Sequelize(
    process.env.DB_NAME || "aulaprog",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "postgres",
    {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        logging: false,
    }
);

module.exports = sequelize;

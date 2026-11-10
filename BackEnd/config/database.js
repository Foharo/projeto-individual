const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("aulaprog", "postgres", "malta2006malu", {
    host: "localhost",
    dialect: "postgres",
    logging: false,
});

module.exports = sequelize;

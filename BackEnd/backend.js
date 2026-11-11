const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const cargoRoutes = require("./routes/cargoRoutes");
const pessoaRoutes = require("./routes/pessoaRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ mensagem: "API em funcionamento" }));
app.use("/cargos", cargoRoutes);
app.use("/pessoas", pessoaRoutes);

// Tratamento central de erros (validação, duplicidade, etc.)
app.use((err, req, res, next) => {
    if (err.name === "SequelizeValidationError") {
        return res.status(400).json({ erro: err.errors.map((e) => e.message).join(" ") });
    }
    if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ erro: "Já existe um registro com esse valor." });
    }
    if (err.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({ erro: "Cargo informado é inválido." });
    }
    if (err.name === "SequelizeDatabaseError") {
        return res.status(400).json({ erro: "Dados inválidos." });
    }
    console.error(err);
    res.status(500).json({ erro: "Erro interno do servidor." });
});

// Cria as tabelas (se não existirem) e inicia o servidor.
sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error("Não foi possível conectar ao banco de dados:", err.message);
        process.exit(1);
    });

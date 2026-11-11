const { Genero, Jogo } = require("../models");

// GET /generos
exports.listar = async (req, res) => {
    const generos = await Genero.findAll({ order: [["nome", "ASC"]] });
    res.json(generos);
};

// GET /generos/:id
exports.buscar = async (req, res) => {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return res.status(404).json({ erro: "Gênero não encontrado." });
    res.json(genero);
};

// POST /generos
exports.criar = async (req, res) => {
    const genero = await Genero.create({ nome: req.body.nome });
    res.status(201).json(genero);
};

// PUT /generos/:id
exports.atualizar = async (req, res) => {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return res.status(404).json({ erro: "Gênero não encontrado." });
    await genero.update({ nome: req.body.nome });
    res.json(genero);
};

// DELETE /generos/:id
exports.excluir = async (req, res) => {
    const genero = await Genero.findByPk(req.params.id);
    if (!genero) return res.status(404).json({ erro: "Gênero não encontrado." });

    const emUso = await Jogo.count({ where: { generoId: genero.id } });
    if (emUso > 0) {
        return res
            .status(409)
            .json({ erro: "Não é possível excluir: existem jogos cadastrados neste gênero." });
    }

    await genero.destroy();
    res.status(204).send();
};

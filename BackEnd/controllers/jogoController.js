const { Jogo, Genero } = require("../models");

const incluirGenero = [{ model: Genero, as: "genero", attributes: ["id", "nome"] }];

// GET /jogos
exports.listar = async (req, res) => {
    const jogos = await Jogo.findAll({ include: incluirGenero, order: [["titulo", "ASC"]] });
    res.json(jogos);
};

// GET /jogos/:id
exports.buscar = async (req, res) => {
    const jogo = await Jogo.findByPk(req.params.id, { include: incluirGenero });
    if (!jogo) return res.status(404).json({ erro: "Jogo não encontrado." });
    res.json(jogo);
};

// POST /jogos
exports.criar = async (req, res) => {
    const { titulo, desenvolvedora, ano, preco, generoId } = req.body;
    const jogo = await Jogo.create({ titulo, desenvolvedora, ano, preco, generoId });
    res.status(201).json(await Jogo.findByPk(jogo.id, { include: incluirGenero }));
};

// PUT /jogos/:id
exports.atualizar = async (req, res) => {
    const jogo = await Jogo.findByPk(req.params.id);
    if (!jogo) return res.status(404).json({ erro: "Jogo não encontrado." });

    const { titulo, desenvolvedora, ano, preco, generoId } = req.body;
    await jogo.update({ titulo, desenvolvedora, ano, preco, generoId });
    res.json(await Jogo.findByPk(jogo.id, { include: incluirGenero }));
};

// DELETE /jogos/:id
exports.excluir = async (req, res) => {
    const jogo = await Jogo.findByPk(req.params.id);
    if (!jogo) return res.status(404).json({ erro: "Jogo não encontrado." });
    await jogo.destroy();
    res.status(204).send();
};

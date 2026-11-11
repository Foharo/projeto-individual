const { Pessoa, Cargo } = require("../models");

const incluirCargo = [{ model: Cargo, as: "cargo", attributes: ["id", "nome"] }];

// GET /pessoas
exports.listar = async (req, res) => {
    const pessoas = await Pessoa.findAll({ include: incluirCargo, order: [["nome", "ASC"]] });
    res.json(pessoas);
};

// GET /pessoas/:id
exports.buscar = async (req, res) => {
    const pessoa = await Pessoa.findByPk(req.params.id, { include: incluirCargo });
    if (!pessoa) return res.status(404).json({ erro: "Pessoa não encontrada." });
    res.json(pessoa);
};

// POST /pessoas
exports.criar = async (req, res) => {
    const { nome, email, cargoId } = req.body;
    const pessoa = await Pessoa.create({ nome, email, cargoId });
    res.status(201).json(await Pessoa.findByPk(pessoa.id, { include: incluirCargo }));
};

// PUT /pessoas/:id
exports.atualizar = async (req, res) => {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (!pessoa) return res.status(404).json({ erro: "Pessoa não encontrada." });

    const { nome, email, cargoId } = req.body;
    await pessoa.update({ nome, email, cargoId });
    res.json(await Pessoa.findByPk(pessoa.id, { include: incluirCargo }));
};

// DELETE /pessoas/:id
exports.excluir = async (req, res) => {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (!pessoa) return res.status(404).json({ erro: "Pessoa não encontrada." });
    await pessoa.destroy();
    res.status(204).send();
};

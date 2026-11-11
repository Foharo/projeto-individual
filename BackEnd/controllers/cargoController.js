const { Cargo, Pessoa } = require("../models");

// GET /cargos
exports.listar = async (req, res) => {
    const cargos = await Cargo.findAll({ order: [["nome", "ASC"]] });
    res.json(cargos);
};

// GET /cargos/:id
exports.buscar = async (req, res) => {
    const cargo = await Cargo.findByPk(req.params.id);
    if (!cargo) return res.status(404).json({ erro: "Cargo não encontrado." });
    res.json(cargo);
};

// POST /cargos
exports.criar = async (req, res) => {
    const cargo = await Cargo.create({ nome: req.body.nome });
    res.status(201).json(cargo);
};

// PUT /cargos/:id
exports.atualizar = async (req, res) => {
    const cargo = await Cargo.findByPk(req.params.id);
    if (!cargo) return res.status(404).json({ erro: "Cargo não encontrado." });
    await cargo.update({ nome: req.body.nome });
    res.json(cargo);
};

// DELETE /cargos/:id
exports.excluir = async (req, res) => {
    const cargo = await Cargo.findByPk(req.params.id);
    if (!cargo) return res.status(404).json({ erro: "Cargo não encontrado." });

    const emUso = await Pessoa.count({ where: { cargoId: cargo.id } });
    if (emUso > 0) {
        return res
            .status(409)
            .json({ erro: "Não é possível excluir: existem pessoas com este cargo." });
    }

    await cargo.destroy();
    res.status(204).send();
};

const pool = require("../db");

async function listar() {
    const result = await pool.query("SELECT * FROM pessoa ORDER BY id_pess");
    return result.rows;
}

async function buscarPorId(id_pess) {
    const result = await pool.query("SELECT * FROM pessoa WHERE id_pess = $1", [
        id_pess,
    ]);
    return result.rows[0];
}

async function inserir(nome_pess) {
    const result = await pool.query(
        "INSERT INTO pessoa(nome_pess) VALUES($1) RETURNING *",
        [nome_pess],
    );

    return result.rows[0];
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
};

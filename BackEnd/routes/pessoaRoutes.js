const express = require("express");

const router = express.Router();

const controller = require("../controllers/pessoaController");

router.get("/", controller.listar);
router.get("/:id", controller.buscar);
router.post("/", controller.inserir);

module.exports = router;

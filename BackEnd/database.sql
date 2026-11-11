-- Script opcional: o backend já cria as tabelas automaticamente (sequelize.sync()).
-- Use este arquivo se preferir criar o banco manualmente.

-- CREATE DATABASE aulaprog;

CREATE TABLE IF NOT EXISTS cargos (
    id   SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS pessoas (
    id       SERIAL PRIMARY KEY,
    nome     VARCHAR(100) NOT NULL,
    email    VARCHAR(100) NOT NULL UNIQUE,
    "cargoId" INTEGER NOT NULL REFERENCES cargos(id) ON DELETE RESTRICT
);

-- Dados de teste
INSERT INTO cargos (nome) VALUES ('Gerente'), ('Analista'), ('Estagiário');
INSERT INTO pessoas (nome, email, "cargoId") VALUES
    ('Ana Souza', 'ana@email.com', 1),
    ('Carlos Lima', 'carlos@email.com', 2);

-- Script opcional: o backend já cria as tabelas automaticamente (sequelize.sync()).
-- Use este arquivo se preferir criar o banco manualmente.

-- CREATE DATABASE aulaprog;

CREATE TABLE IF NOT EXISTS generos (
    id   SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS jogos (
    id             SERIAL PRIMARY KEY,
    titulo         VARCHAR(100) NOT NULL,
    desenvolvedora VARCHAR(100) NOT NULL,
    ano            INTEGER NOT NULL,
    preco          DECIMAL(10,2) NOT NULL,
    "generoId"     INTEGER NOT NULL REFERENCES generos(id) ON DELETE RESTRICT
);

-- Dados de teste
INSERT INTO generos (nome) VALUES ('Ação'), ('RPG'), ('Aventura'), ('Esportes'), ('Estratégia');
INSERT INTO jogos (titulo, desenvolvedora, ano, preco, "generoId") VALUES
    ('The Witcher 3: Wild Hunt', 'CD Projekt Red', 2015, 79.90, 2),
    ('Celeste', 'Maddy Makes Games', 2018, 36.99, 3),
    ('FIFA 23', 'EA Sports', 2022, 199.90, 4);

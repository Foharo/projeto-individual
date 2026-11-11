# GameVault — Loja de Jogos Digitais

Projeto de CRUD para gerenciar o catálogo de uma loja de jogos digitais, feito com **React** (Front-end) e **Node.js + Express + Sequelize + PostgreSQL** (Back-end).

## Estrutura

```
.
├── BackEnd/                 API REST
│   ├── config/database.js   conexão com o PostgreSQL
│   ├── models/              Genero, Jogo e relacionamento
│   ├── controllers/         regras de cada operação do CRUD
│   ├── routes/              rotas /generos e /jogos
│   ├── database.sql         script SQL opcional (tabelas + dados de teste)
│   └── backend.js           ponto de entrada do servidor (porta 3000)
└── FrontEnd/                Interface React (Vite)
    └── src/
        ├── components/      Sidebar, Footer, Main, Botao, Alerta
        ├── pages/           Home, Jogos, Generos
        └── services/api.js  comunicação com o back-end
```

## Pré-requisitos

- Node.js 20+
- PostgreSQL com um banco chamado `aulaprog` (`CREATE DATABASE aulaprog;`)

## Como executar

### 1. Back-end

```bash
cd BackEnd
npm install
npm run dev        # ou: npm start
```

As tabelas são criadas automaticamente na primeira execução.
Por padrão usa usuário `postgres` e senha `postgres`. Para mudar, defina variáveis de ambiente:

```bash
# Linux/Mac
DB_PASSWORD=sua_senha npm run dev
# Windows (PowerShell)
$env:DB_PASSWORD="sua_senha"; npm run dev
```

Variáveis disponíveis: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `PORT`.

### 2. Front-end

```bash
cd FrontEnd
npm install
npm run dev
```

Acesse http://localhost:5173. Se o back-end estiver em outro endereço, crie `FrontEnd/.env` com `VITE_API_URL=http://localhost:3000`.

## Rotas da API

| Método | Rota            | Ação                |
|--------|-----------------|---------------------|
| GET    | `/generos`      | Listar gêneros      |
| POST   | `/generos`      | Cadastrar gênero    |
| PUT    | `/generos/:id`  | Atualizar gênero    |
| DELETE | `/generos/:id`  | Excluir gênero      |
| GET    | `/jogos`        | Listar jogos        |
| POST   | `/jogos`        | Cadastrar jogo      |
| PUT    | `/jogos/:id`    | Atualizar jogo      |
| DELETE | `/jogos/:id`    | Excluir jogo        |

Corpo de `/generos`: `{ "nome": "RPG" }`
Corpo de `/jogos`: `{ "titulo": "Celeste", "desenvolvedora": "Maddy Makes Games", "ano": 2018, "preco": 36.99, "generoId": 1 }`

## Roteiro para a demonstração

1. Abrir **Gêneros** e cadastrar, por exemplo, "RPG" (**Create**).
2. A lista é atualizada com o novo registro (**Read**).
3. Clicar em **Editar**, mudar o nome e salvar (**Update**).
4. Ir em **Jogos**, cadastrar um jogo escolhendo o gênero; ele aparece como card no catálogo.
5. Clicar em **Excluir** para remover um registro (**Delete**).
6. Conferir no banco: `SELECT * FROM generos;` e `SELECT * FROM jogos;`.

> Um gênero que ainda possui jogos não pode ser excluído (a API retorna uma mensagem explicando).

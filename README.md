# Cadastro de Pessoas e Cargos

Projeto de CRUD com **React** (Front-end) e **Node.js + Express + Sequelize + PostgreSQL** (Back-end).

## Estrutura

```
.
├── BackEnd/                 API REST
│   ├── config/database.js   conexão com o PostgreSQL
│   ├── models/              Cargo, Pessoa e relacionamento
│   ├── controllers/         regras de cada operação do CRUD
│   ├── routes/              rotas /cargos e /pessoas
│   ├── database.sql         script SQL opcional (tabelas + dados de teste)
│   └── backend.js           ponto de entrada do servidor (porta 3000)
└── FrontEnd/                Interface React (Vite)
    └── src/
        ├── components/      Header, Footer, Main, Botao, Alerta
        ├── pages/           Home, Pessoas, Cargos
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
| GET    | `/cargos`       | Listar cargos       |
| POST   | `/cargos`       | Cadastrar cargo     |
| PUT    | `/cargos/:id`   | Atualizar cargo     |
| DELETE | `/cargos/:id`   | Excluir cargo       |
| GET    | `/pessoas`      | Listar pessoas      |
| POST   | `/pessoas`      | Cadastrar pessoa    |
| PUT    | `/pessoas/:id`  | Atualizar pessoa    |
| DELETE | `/pessoas/:id`  | Excluir pessoa      |

Corpo de `/cargos`: `{ "nome": "Gerente" }`
Corpo de `/pessoas`: `{ "nome": "Ana", "email": "ana@email.com", "cargoId": 1 }`

## Roteiro para a demonstração

1. Abrir **Cargos** e cadastrar, por exemplo, "Gerente" (**Create**).
2. A lista é atualizada com o novo registro (**Read**).
3. Clicar em **Editar**, mudar o nome e salvar (**Update**).
4. Ir em **Pessoas**, cadastrar uma pessoa escolhendo o cargo.
5. Clicar em **Excluir** para remover um registro (**Delete**).
6. Conferir no banco: `SELECT * FROM cargos;` e `SELECT * FROM pessoas;`.

> Um cargo que ainda possui pessoas não pode ser excluído (a API retorna uma mensagem explicando).

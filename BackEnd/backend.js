const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");

const pool = require("./db");
app.use(express.json());


const cargoRoutes = require("./routes/cargoRoutes");
app.use("/cargos", cargoRoutes);

const pessoaRoutes = require("./routes/pessoaRoutes");
app.use("/pessoas", pessoaRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

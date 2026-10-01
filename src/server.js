const express = require("express");
const { moveHandler, healthHandler } = require("./handler");
const app = express();

app.use(express.json());

function validarMove(req, res, next) {

    if (!req.body.jugador) {
        return res.status(400).json("Error: Falta jugador");
    }

    if (!req.body.dado) {
        return res.status(400).json("Error: Falta valor del dado");
    }

    if (!req.body.tablero) {
        return res.status(400).json("Error: Falta el tablero");
    }

    next();
}

app.post("/move", validarMove, moveHandler);

app.get("/health", healthHandler);

app.use((req, res) => {
    res.status(404).json("Error 404");
});

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json("Error 500")
    
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
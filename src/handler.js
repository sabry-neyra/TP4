const { chooseMove } = require("./strategy");

function moveHandler(req, res) {
    const state = req.body;     //recibe el estado
    const move = chooseMove(state);    //se lo pasa a la estrategia
    res.json(move);     //devuelve el resultado
}

function healthHandler(req, res) {
    res.json({ "status": "ok" })
}

module.exports = { moveHandler, healthHandler };

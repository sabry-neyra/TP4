const { chooseMove } = require("./strategy");

function moveHandler(req, res) {
    const state = req.body;     //recibe el estado
    const move = chooseMove(state);    //se lo pasa a la estrategia
    res.json(move);     //devuelve el resultado
}

function healthHandler(req, res) {
    res.json({ "status": "ok" })
}

function profileHandler(req, res) {
    res.json({
        name: "Sabry Neyra",
        colors: ["#87CEEB", "#000000", "#87CEEB"]
    });
}

module.exports = { moveHandler, healthHandler, profileHandler };
const { chooseMove } = require("../src/strategy");

test("si el dado es 1, la pieza va al norte", () => {
    const state = {
    jugador: "A",
    dado: 1,
    tablero: [
        ["A1", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
};
expect(chooseMove(state)).toEqual({ A1: "N" });
});

test("si el dado es 2, la pieza va al este", () => {
const state = {
    jugador: "A",
    dado: 2,
    tablero: [
        ["A1", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
};
expect(chooseMove(state)).toEqual({ A1: "E" });
});

test("si el dado es 3, la pieza va al sur", () => {
const state = {
    jugador: "A",
    dado: 3,
    tablero: [
        ["A1", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
};
expect(chooseMove(state)).toEqual({ A1: "S" });
});


test("si el dado es 3, las piezas van al sur", () => {
    const state = {
        jugador: "A",
        dado: 3,
        tablero: [
            ["A1", "A2", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({
        A1: "S",
        A2: "S"
    });
});



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

test("el bot debe devolver un movimiento cuando tiene una pieza disponible", () => {
    const state = {
        jugador: "A",
        dado: 3,
        tablero: [
            ["", "", ""],
            ["", "A1", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).not.toEqual({});
});

test("el bot no mueve las piezas del rival", () => {
    const state = {
        jugador: "A",
        dado: 3,
        tablero: [
            ["A1", "B1", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({
        A1: "S"
    });
});

test("el bot no mueve las casas neutrales", () => {
    const state = {
        jugador: "A",
        dado: 2,
        tablero: [
            ["A1", "N", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({
        A1: "E"
    });
});

test("el bot mueve las piezas del jugador B", () => {
    const state = {
        jugador: "B",
        dado: 1,
        tablero: [
            ["B1", "A1", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({
        B1: "N"
    });
});

test("el bot no devuelve movimientos si el jugador no tiene piezas", () => {
    const state = {
        jugador: "A",
        dado: 2,
        tablero: [
            ["B1", "N", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({});
});

test("la estrategia no modifica el estado original", () => {
    const state = {
        jugador: "A",
        dado: 2,
        tablero: [
            ["A1", "N", ""],
            ["", "B1", ""],
            ["", "", ""]
        ]
    };

    const copia = JSON.parse(JSON.stringify(state));

    chooseMove(state);

    expect(state).toEqual(copia);
});
test("el bot genera movimientos reproducibles con una semilla fija", () => {
    let semilla = 12345;

    function generarNumero() {
        semilla = (semilla * 1103515245 + 12345) % 2147483648;
        return semilla;
    }

    const tablero = [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""]
    ];

    const fila = generarNumero() % 10;
    const columna = generarNumero() % 10;

    tablero[fila][columna] = "A1";

    const state = {
        jugador: "A",
        dado: 1,
        tablero: tablero
    };

    expect(chooseMove(state)).toEqual({ A1: "N" });
});

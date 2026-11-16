import { chooseMove } from "../src/strategy";

test("si el dado es 1, la pieza va al norte", () => {
    const state = {
        jugador: "A" as const,
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
        jugador: "A" as const,
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
        jugador: "A" as const,
        dado: 3,
        tablero: [
            ["A1", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({ A1: "S" });
});

test("devuelve los movimientos de varias piezas", () => {
    const state = {
        jugador: "A" as const,
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

test("no mueve las piezas del rival", () => {
    const state = {
        jugador: "A" as const,
        dado: 1,
        tablero: [
            ["A1", "B1", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({ A1: "N" });
});

test("no mueve las casillas neutrales", () => {
    const state = {
        jugador: "A" as const,
        dado: 2,
        tablero: [
            ["N", "A1", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({ A1: "E" });
});

test("funciona con el jugador B", () => {
    const state = {
        jugador: "B" as const,
        dado: 2,
        tablero: [
            ["A1", "", ""],
            ["B1", "", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({ B1: "E" });
});

test("no devuelve movimientos si no hay piezas propias", () => {
    const state = {
        jugador: "A" as const,
        dado: 1,
        tablero: [
            ["B1", "", ""],
            ["", "N", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({});
});

test("no modifica el estado original", () => {
    const state = {
        jugador: "A" as const,
        dado: 1,
        tablero: [
            ["A1", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    const original = JSON.stringify(state);

    chooseMove(state);

    expect(JSON.stringify(state)).toBe(original);
});

test("devuelve el movimiento esperado para A1", () => {
    const state = {
        jugador: "A" as const,
        dado: 1,
        tablero: Array.from({ length: 10 }, () => Array(10).fill(""))
    };

    state.tablero[2][2] = "A1";

    expect(chooseMove(state)).toEqual({ A1: "N" });
});

test("devuelve el movimiento esperado para B1", () => {
    const state = {
        jugador: "B" as const,
        dado: 2,
        tablero: Array.from({ length: 10 }, () => Array(10).fill(""))
    };

    state.tablero[3][3] = "B1";

    expect(chooseMove(state)).toEqual({ B1: "E" });
});
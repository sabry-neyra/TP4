
import { chooseMove, GameState } from "../src/strategy";

test("si el dado es 1, la pieza va al este", () => {
    const state: GameState = {
        jugador: "A",
        dado: 1,
        tablero: [
            ["", "", ""],
            ["", "A1", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({ A1: "E" });
});

test("si el dado es 2, la pieza va al este", () => {
    const state: GameState = {
        jugador: "A",
        dado: 2,
        tablero: [
            ["", "", ""],
            ["", "A1", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({ A1: "E" });
});

test("si el dado es 3, la pieza va al sur", () => {
    const state: GameState = {
        jugador: "A",
        dado: 3,
        tablero: [
            ["", "", ""],
            ["", "A1", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({ A1: "S" });
});

test("mueve todas las piezas del jugador", () => {
    const state: GameState = {
        jugador: "A",
        dado: 3,
        tablero: [
            ["", "", ""],
            ["", "A1", ""],
            ["A2", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({
        A1: "S",
        A2: "S"
    });
});

test("no mueve las piezas del rival", () => {
    const state: GameState = {
        jugador: "A",
        dado: 1,
        tablero: [
            ["", "", ""],
            ["", "A1", ""],
            ["", "B1", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({ A1: "E" });
});

test("no mueve las casillas neutrales", () => {
    const state: GameState = {
        jugador: "A",
        dado: 1,
        tablero: [
            ["", "N", ""],
            ["", "A1", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({ A1: "E" });
});

test("si el jugador es B, mueve sus piezas", () => {
    const state: GameState = {
        jugador: "B",
        dado: 2,
        tablero: [
            ["", "", ""],
            ["", "B1", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({ B1: "E" });
});

test("si no hay piezas propias, devuelve un objeto vacío", () => {
    const state: GameState = {
        jugador: "A",
        dado: 1,
        tablero: [
            ["", "N", ""],
            ["", "B1", ""],
            ["", "", ""]
        ]
    };

    expect(chooseMove(state)).toEqual({});
});

test("devuelve el movimiento esperado para A1", () => {
    const state: GameState = {
        jugador: "A",
        dado: 1,
        tablero: Array.from({ length: 10 }, () => Array(10).fill(""))
    };

    state.tablero[2][2] = "A1";

    expect(chooseMove(state)).toEqual({ A1: "E" });
});

test("devuelve el movimiento esperado para B1", () => {
    const state: GameState = {
        jugador: "B",
        dado: 3,
        tablero: Array.from({ length: 10 }, () => Array(10).fill(""))
    };

    state.tablero[3][3] = "B1";

    expect(chooseMove(state)).toEqual({ B1: "S" });
});

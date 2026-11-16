import request from "supertest";
import app from "../src/app";

test("el bot recibe el estado y devuelve un movimiento", async () => {
    const state = {
        rulesVersion: 2,
        jugador: "A",
        dado: 3,
        tablero: [
            ["A1", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    const response = await request(app).post("/move").send(state);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ A1: "S" });
});

test("el endpoint profile devuelve el nombre y los colores del bot", async () => {
    const response = await request(app).get("/profile");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        name: "Sabry Neyra",
        colors: ["#87CEEB", "#000000", "#87CEEB"]
    });
});

test("el servidor rechaza una solicitud sin jugador", async () => {
    const state = {
        rulesVersion: 2,
        dado: 1,
        tablero: [["A1", "", ""], ["", "", ""], ["", "", ""]]
    };

    const response = await request(app).post("/move").send(state);

    expect(response.status).toBe(400);
    expect(response.body).toBe("Error: Falta jugador");
});

test("el servidor devuelve los movimientos de varias piezas", async () => {
    const state = {
        rulesVersion: 2,
        jugador: "A",
        dado: 2,
        tablero: [
            ["A1", "A2", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    const response = await request(app).post("/move").send(state);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ A1: "E", A2: "E" });
});

test("el servidor rechaza un jugador inválido", async () => {
    const state = {
        rulesVersion: 2,
        jugador: "C",
        dado: 1,
        tablero: [["C1", "", ""], ["", "", ""], ["", "", ""]]
    };

    const response = await request(app).post("/move").send(state);

    expect(response.status).toBe(400);
});

test("el servidor rechaza un tablero inválido", async () => {
    const state = {
        rulesVersion: 2,
        jugador: "A",
        dado: 2,
        tablero: "hola"
    };

    const response = await request(app).post("/move").send(state);

    expect(response.status).toBe(400);
});

test("el servidor rechaza una versión de reglas incompatible", async () => {
    const state = {
        rulesVersion: 1,
        jugador: "A",
        dado: 2,
        tablero: [["A1", "", ""], ["", "", ""], ["", "", ""]]
    };

    const response = await request(app).post("/move").send(state);

    expect(response.status).toBe(400);
});

test("el servidor rechaza un estado sin versión de reglas", async () => {
    const state = {
        jugador: "A",
        dado: 2,
        tablero: [["A1", "", ""], ["", "", ""], ["", "", ""]]
    };

    const response = await request(app).post("/move").send(state);

    expect(response.status).toBe(400);
});
const request = require("supertest");
const app = require("../src/server");

test("el bot recibe el estado y devuelve un movimiento", async () => {
    const state = {
        jugador: "A",
        dado: 3,
        tablero: [
            ["A1", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    };

    const response = await request(app)
        .post("/move")
        .send(state);

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
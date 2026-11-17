
import express, { Request, Response, NextFunction } from "express";
import {
    moveHandler,
    healthHandler,
    profileHandler
} from "./handler";

const app = express();

app.use(express.json());

// Validación de los datos recibidos por el árbitro.
function validarMove(req: Request, res: Response, next: NextFunction): void {
    const state = req.body;

    if (!state || typeof state !== "object" || Array.isArray(state)) {
        res.status(400).json("Error: Estado inválido");
        return;
    }

    if (!state.jugador) {
        res.status(400).json("Error: Falta jugador");
        return;
    }

    if (state.jugador !== "A" && state.jugador !== "B") {
        res.status(400).json("Error: Jugador inválido");
        return;
    }

    if (state.dado === undefined || state.dado === null) {
        res.status(400).json("Error: Falta valor del dado");
        return;
    }

    if (
        !Number.isInteger(state.dado) ||
        state.dado < 1 ||
        state.dado > 3
    ) {
        res.status(400).json("Error: Valor del dado inválido");
        return;
    }

    if (!state.tablero) {
        res.status(400).json("Error: Falta el tablero");
        return;
    }

    if (!Array.isArray(state.tablero)) {
        res.status(400).json("Error: Tablero inválido");
        return;
    }

    next();
}

app.post("/move", validarMove, moveHandler);
app.get("/health", healthHandler);
app.get("/profile", profileHandler);

app.use((req: Request, res: Response) => {
    res.status(404).json("Error 404");
});

app.use((
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);
    res.status(500).json("Error 500");
});

export { app };
export default app;

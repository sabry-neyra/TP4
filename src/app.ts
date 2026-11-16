import express, { Request, Response, NextFunction } from "express";
import {
    moveHandler,
    healthHandler,
    profileHandler
} from "./handler";

const app = express();

app.use(express.json());

function validarMove(req: Request, res: Response, next: NextFunction): void {
    if (req.body.rulesVersion !== 2) {
        res.status(400).json("Error: Versión de reglas incompatible");
        return;
    }

    if (!req.body.jugador) {
        res.status(400).json("Error: Falta jugador");
        return;
    }

    if (req.body.jugador !== "A" && req.body.jugador !== "B") {
        res.status(400).json("Error: Jugador inválido");
        return;
    }

    if (!req.body.dado) {
        res.status(400).json("Error: Falta valor del dado");
        return;
    }

    if (!req.body.tablero) {
        res.status(400).json("Error: Falta el tablero");
        return;
    }

    if (!Array.isArray(req.body.tablero)) {
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

export default app;
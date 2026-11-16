import { Request, Response } from "express";
import { chooseMove, GameState } from "./strategy";

export function moveHandler(
    req: Request<{}, {}, GameState>,
    res: Response
): void {
    const state = req.body;
    const move = chooseMove(state);

    res.json(move);
}

export function healthHandler(req: Request, res: Response): void {
    res.json({ status: "ok" });
}

export function profileHandler(req: Request, res: Response): void {
    res.json({
        name: "Sabry Neyra",
        colors: ["#87CEEB", "#000000", "#87CEEB"]
    });
}
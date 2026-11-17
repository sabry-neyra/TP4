export type Jugador = "A" | "B";
export type Direccion = "N" | "E" | "S";

export interface GameState {
    rulesVersion?: number;
    jugador: Jugador;
    dado: number;
    tablero: string[][];
}

export function chooseMove(state: GameState): Record<string, Direccion> {
    const movements: Record<string, Direccion> = {};

    for (let fila = 0; fila < state.tablero.length; fila++) {
        for (let columna = 0; columna < state.tablero[fila].length; columna++) {
            const celda = state.tablero[fila][columna];

            if (celda.startsWith(state.jugador)) {
                if (state.dado === 1) movements[celda] = "N";
                else if (state.dado === 2) movements[celda] = "E";
                else if (state.dado === 3) movements[celda] = "S";
            }
        }
    }

    return movements;
}

const prueba: number = "error";

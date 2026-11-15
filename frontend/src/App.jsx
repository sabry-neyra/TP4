

import './App.css'

function App() {
  return (
    <main>
      <h1>{import.meta.env.VITE_NOMBRE_JUEGO}</h1>
      <p>Visualización de la partida</p>

      <div className="tablero">
        {Array.from({ length: 100 }, (_, i) => (
          <div
            className={`casilla ${i === 22 ? 'jugador-a' : ''} ${i === 77 ? 'jugador-b' : ''}`}
            key={i}
          >
            {i === 0 ? 'N' : i === 22 ? 'A1' : i === 77 ? 'B1' : ''}
          </div>
        ))}
      </div>
    </main>
  )
}

export default App

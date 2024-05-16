import { useState } from "react"
import confetti from "canvas-confetti"
import "./App.css"

const TURNS = {
  X: "x",
  O: "o",
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  //null es que no hay ganador, false es un empate.
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && // O -> x u o
        boardToCheck[a] === boardToCheck[b] && // 0 y 3 ->
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }

  //checkEndGame
  const checkEndGame = (newBoard) => {
    //Revisamos si hay empare, si no hay mas espacions vacios en el tablero
    return newBoard.every((square)=> square  != null)
  }

  //Componente para resetear el juego
  const resetGame = () => { 
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  //Componente para Actualizar el tablero
  const updateBoard = (index) => {
    //no actualizamos esta posicion
    //si ya tiene algo
    if (board[index] || winner) return
    //Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)

    if (newWinner){
      confetti()
      setWinner(newWinner)

      //Check if game is over
    } else if (checkEndGame(newBoard)){
      setWinner(false)//Empate
    }
  }


  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">

        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })}
      </section>


      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        winner != null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                    ? 'empate'
                    : 'Ganó:'
                }
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar De Nuevo</button>
              </footer>

            </div>
          </section>
        )
      }

    </main>
  )
}

export default App;

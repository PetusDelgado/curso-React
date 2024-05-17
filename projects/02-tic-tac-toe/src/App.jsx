import { useState } from "react"
import confetti from "canvas-confetti"
import "./App.css"
import { Square } from "./components/Square.jsx"
import { TURNS} from "./components/constants.jsx"
import { checkWinnerFrom } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)

  //null es que no hay ganador, false es un empate.
  const [winner, setWinner] = useState(null)

  

   //Componente para resetear el juego
   const resetGame = () => { 
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  //checkEndGame
  const checkEndGame = (newBoard) => {
    //Revisamos si hay empare, si no hay mas espacions vacios en el tablero
    return newBoard.every((square)=> square  != null)
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
    const newWinner = checkWinnerFrom(newBoard)

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
        <WinnerModal resetGame={resetGame} winner={winner}/>
      

    </main>
  )
}

export default App;

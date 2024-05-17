import { WINNER_COMBOS } from "../components/constants"
export const checkWinnerFrom = (boardToCheck) => {
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
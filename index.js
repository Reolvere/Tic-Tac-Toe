//get an element
const gameboardCell = document.querySelectorAll(".gameboard-cell")
const resultBoard = document.querySelector(".result")
const restart = document.querySelector(".restart")

const gameboard = (function (){
    const stateFlag = true
    const gameOver = false 
    const board = ["", "", "", "", "", "", "", "", ""]

    const winningCombinations = [
        [0, 1, 2],  // Top row
        [3, 4, 5],  // Middle row
        [6, 7, 8],  // Bottom row
        [0, 3, 6],  // Left column
        [1, 4, 7],  // Middle column
        [2, 5, 8],  // Right column
        [0, 4, 8],  // Diagonal from top-left
        [2, 4, 6]   // Diagonal from top-right
    ];

    return {stateFlag, gameOver, board, winningCombinations}
})()

function checkWinner(board){
    for(let combination of gameboard.winningCombinations){
        const [a, b, c] = combination
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];  // Return "X" or "O" (the winner)
        }
    }
}

gameboardCell.forEach((cell, index) => {

    cell.addEventListener("click", (e) => {
        e.preventDefault()        
        
        if(!gameboard.gameOver && cell.textContent === ""){
            if(gameboard.stateFlag){
                cell.textContent = "X"
                gameboard.board[index] = "X"
            } else {
                cell.textContent = "O"
                gameboard.board[index] = "O"
            }
        }

        //toggle between x and o
        gameboard.stateFlag = !gameboard.stateFlag

        // Check if there is a winner after this move
        let winner = checkWinner(gameboard.board)
        if (winner) {
            resultBoard.textContent = `${winner} has won!`;
            gameboard.gameOver = true  // Set flag to stop the game
        } else if (!gameboard.board.includes("")) {
            resultBoard.textContent = "It's a draw!" // If no empty cells and no winner, it's a draw
            gameboard.gameOver = true
        }
    })
})

restart.addEventListener("click", (e) => {
    e.preventDefault()
    location.reload()
})
const gameBoard = document.getElementById('gameBoard');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
const cells = document.querySelectorAll('.cell');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;
let isAI = true; // Simple AI for O (toggle false for two-player only)

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6] // diags
];

function handleCellClick(index) {
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        highlightWinningLine();
        return;
    }

    if (board.every(cell => cell)) {
        statusDisplay.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

    if (currentPlayer === 'O' && isAI && gameActive) {
        // Simple AI: random move after short delay
        setTimeout(aiMove, 500);
    }
}

function aiMove() {
    const emptyCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    if (emptyCells.length === 0) return;
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    handleCellClick(randomIndex);
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function highlightWinningLine() {
    // Find and highlight the winning line (first match)
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add('winner-line');
            cells[b].classList.add('winner-line');
            cells[c].classList.add('winner-line');
            break;
        }
    }
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);

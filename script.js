let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let lastMove = -1; // Track the index of the last move

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        updateBoard();
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        lastMove = index; // Update last move index
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index];
    });
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            displayWinner(gameBoard[a]);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        displayDraw();
    }
}

function displayWinner(player) {
    document.getElementById('message').textContent = `Player ${player} wins!`;
    gameActive = false;
}

function displayDraw() {
    document.getElementById('message').textContent = "It's a draw!";
    gameActive = false;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    lastMove = -1; // Reset last move index
    document.getElementById('message').textContent = '';
    updateBoard();
}

function undoMove() {
    if (lastMove !== -1 && gameActive) {
        gameBoard[lastMove] = '';
        updateBoard();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        lastMove = -1; // Reset last move index
    }
}

function showLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('active');

    setTimeout(() => {
        loader.classList.remove('active');
        document.querySelector('.container').style.display = 'block';
        document.querySelector('.loader').style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.container').style.display = 'none';
    showLoader();
});

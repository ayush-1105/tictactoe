let currentPlayer = 'X';
        let gameBoard = Array(100).fill('');
        let gameActive = true;
        let lastMove = -1;

        const winningCombinations = getWinningCombinations();

        function getWinningCombinations() {
            const combinations = [];
            // Rows
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j <= 5; j++) {
                    combinations.push(Array.from({ length: 5 }, (_, k) => i * 10 + j + k));
                }
            }
            // Columns
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j <= 5; j++) {
                    combinations.push(Array.from({ length: 5 }, (_, k) => (j + k) * 10 + i));
                }
            }
            // Diagonals
            for (let i = 0; i <= 5; i++) {
                for (let j = 0; j <= 5; j++) {
                    combinations.push(Array.from({ length: 5 }, (_, k) => (i + k) * 10 + j + k));
                    combinations.push(Array.from({ length: 5 }, (_, k) => (i + k) * 10 + j - k + 4));
                }
            }
            return combinations;
        }

        function handleClick(index) {
            if (gameBoard[index] === '' && gameActive) {
                gameBoard[index] = currentPlayer;
                updateBoard();
                checkWinner();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                lastMove = index;
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
                const isWinning = combination.every(index => gameBoard[index] === currentPlayer);
                if (isWinning) {
                    displayWinner(currentPlayer);
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
            gameBoard = Array(100).fill('');
            gameActive = true;
            lastMove = -1;
            document.getElementById('message').textContent = '';
            updateBoard();
        }

        function undoMove() {
            if (lastMove !== -1 && gameActive) {
                gameBoard[lastMove] = '';
                updateBoard();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                lastMove = -1;
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

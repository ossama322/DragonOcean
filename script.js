let board = [];
let gameOver = false;
let mineCount = 5;  // عدد الألغام (الدجاجات)

function startGame() {
    gameOver = false;
    board = [];
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';

    // إنشاء اللوحة 5x5
    for (let i = 0; i < 5; i++) {
        board[i] = [];
        for (let j = 0; j < 5; j++) {
            board[i][j] = {
                revealed: false,
                mine: false,
                element: null
            };
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => revealCell(i, j));
            board[i][j].element = cell;
            boardContainer.appendChild(cell);
        }
    }

    // وضع الألغام (الدجاجات)
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const row = Math.floor(Math.random() * 5);
        const col = Math.floor(Math.random() * 5);
        if (!board[row][col].mine) {
            board[row][col].mine = true;
            minesPlaced++;
        }
    }
}

function revealCell(row, col) {
    if (gameOver || board[row][col].revealed) return;

    board[row][col].revealed = true;
    const cell = board[row][col].element;

    if (board[row][col].mine) {
        cell.classList.add('mine');
        cell.innerText = '💀';  // إيموجي دجاجة تمثل اللغم
        alert('Game Over! You hit a chicken mine!');
        gameOver = true;
    } else {
        cell.classList.add('revealed');
        cell.classList.add('safe');
        cell.innerText = '🐔';  // إيموجي دجاجة لتمثيل الخلية الآمنة
    }
}

// بدء اللعبة عند تحميل الصفحة
startGame();
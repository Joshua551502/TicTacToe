var player = 1;
var gridItems = Array.from(document.querySelectorAll('.grid-item'));
var resetBtn = document.querySelector('.reset-btn');
var char = '';
var player1 = document.querySelector('.player1');
var computer = document.querySelector('.computer');
var playerScore = 1;
var computerScore = 1;
var winnerFound = false;
var winner;

// Audio
var click = new Audio("sounds/click.mp3");
var win = new Audio("sounds/win.mp3");
var lose = new Audio("sounds/lose.mp3");
var reset = new Audio("sounds/reset.mp3");
var draw = new Audio("sounds/draw.mp3");

function computerMove() {
    var emptyItems = gridItems.filter(function (item) {
        return item.textContent === '';
    });

    var index = Math.floor(Math.random() * emptyItems.length);

    emptyItems[index].textContent = 'O';
    emptyItems[index].style.color = '#08BC6A';
    click.play();
    if (!checkWinner('O')) {
        document.getElementById('winner').innerHTML = '<span style="color: #F22901">Your Turn!</span>';
    }
    enableBoard(); // enable the board after the move is made
}

function disableBoard() {
    gridItems.forEach(function (item) {
        item.removeEventListener('click', handleClick);
    });
}

function enableBoard() {
    gridItems.forEach(function (item) {
        item.addEventListener('click', handleClick);
    });
}

let timeoutID; // Variable to store the timeout ID

function handleClick() {
    if (this.textContent !== '' || winnerFound) {
        return; // square already selected or a winner is found, do nothing
    }

    disableBoard(); // disable the board before making the move

    char = 'X';
    document.getElementById('winner').innerHTML = '<span style="color: #08BC6A">CPU Thinking...</span>';

    this.textContent = char;
    this.style.color = '#F22901';
    click.play();

    if (checkWinner('X') === null) {
        checkFull();
        timeoutID = setTimeout(function () {
            if (!winnerFound) {
                computerMove();
            } else if (checkWinner(char) !== null) {
                disableBoard();
                winnerFound = true; // Set winnerFound to true
            }
        }, 1000);
    }
}

// Event listener for reset button
resetBtn.addEventListener('click', function () {
    clearTimeout(timeoutID); // Cancel the countdown
    gridItems.forEach(function (item) {
        item.textContent = '';
        item.style.color = '';
    });
    enableBoard();
    winnerFound = false;
    document.getElementById('winner').innerHTML = 'Start Playing!';
    char = 'X';
    reset.play();
});

function checkWinner(char) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        if (
            combo.every((cell) => gridItems[cell].textContent === char)
        ) {
            if (char === 'X') {
                document.getElementById('winner').innerHTML =
                    '<span style="color: #F22901">You Won!</span>';
                document.getElementById('player').innerHTML =
                    'YOU: ' + playerScore++;
                winner = 'X';
                win.play();
            } else {
                document.getElementById('winner').innerHTML =
                    '<span style="color: #08BC6A">CPU Won!</span>';
                document.getElementById('computer').innerHTML =
                    'CPU: ' + computerScore++;
                winner = 'O';
                lose.play();
            }
            winnerFound = true;
            drawLine();
            disableBoard(); // Disable the board after a winner is found
            return winner;
        }
    }

    return null;
}

gridItems.forEach(function (item) {
    item.addEventListener('click', handleClick);
});

function checkFull() {
    var isFull = gridItems.every(function (item) {
        return item.textContent !== '';
    });

    if (isFull && checkWinner(char) === null) {
        document.getElementById('winner').innerHTML = 'Draw!';
        draw.play();
    }
}

function drawLine() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const canvas = document.getElementById('line');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (
            combination.every((cell) => gridItems[cell].textContent === winner)
        ) {
            const startLineId = 'item' + (combination[0] + 1);
            const endLineId = 'item' + (combination[combination.length - 1] + 1);

            const startLine = document.getElementById(startLineId);
            const endLine = document.getElementById(endLineId);

            const rect1 = startLine.getBoundingClientRect();
            const rect2 = endLine.getBoundingClientRect();

            const startCenterX = rect1.left + rect1.width / 2;
            const startCenterY = rect1.top + rect1.height / 2;
            const endCenterX = rect2.left + rect2.width / 2;
            const endCenterY = rect2.top + rect2.height / 2;

            const lineWidth = 15;
            const lineColor = winner === 'X' ? '#F22901' : '#08BC6A';

            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth;

            ctx.beginPath();
            ctx.moveTo(startCenterX, startCenterY);
            ctx.lineTo(endCenterX, endCenterY);
            ctx.stroke();
            if (resetBtn.addEventListener('click', function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }));
            break; // Exit the loop after drawing the line
        }
    }
}


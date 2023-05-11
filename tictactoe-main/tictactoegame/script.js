var player = 1;
var gridItems = document.querySelectorAll('.grid-item');
var resetBtn = document.querySelector('.reset-btn');
var char = '';
var player1 = document.querySelector('.player1');
var computer = document.querySelector('.computer');
var playerScore = 0;
var computerScore = 1;
var click = new Audio("sounds/click.mp3");
var win = new Audio("sounds/win.mp3");
var lose = new Audio("sounds/lose.mp3");
var reset = new Audio("sounds/reset.mp3");
var draw = new Audio("sounds/draw.mp3");


function computerMove() {
    var emptyItems = Array.from(gridItems).filter(function (item) {
        return item.textContent === '';
    });

    var index = Math.floor(Math.random() * emptyItems.length);

    emptyItems[index].textContent = 'O';
    emptyItems[index].style.color = '#0020c2';
    click.play();
    checkWinner('O');

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

function handleClick() {
    if (this.textContent !== '') {
        return; // square already selected, do nothing
    }

    disableBoard(); // disable the board before calling computerMove

    flag = false;
    char = 'X';

    if (this.textContent === '') {
        this.textContent = char;
        this.style.color = '#c20000';
        click.play();
        flag = true;
    }

    if (flag === true) {
        char = 'O';
        setTimeout(function () {
            if (!winnerFound && checkWinner(char) === null && char === 'O') {
                computerMove();
            }
        }, 1000);
    }

    if (checkWinner('X') === null)
    (checkFull())

}

var winnerFound = false;

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
        if (combo.every(cell => gridItems[cell].textContent === char)) {
            if (char === 'X') {
                document.getElementById('winner').innerHTML = 'You Won!';
                document.getElementById('player').innerHTML = 'YOU: ' + (++playerScore);
                win.play();
            } else {
                document.getElementById('winner').innerHTML = 'Computer Won!';
                document.getElementById('computer').innerHTML = 'CPU: ' + computerScore++;
                lose.play();
            }
            winnerFound = true;
            
            disableBoard();
            return;
        }
    }

    return null;
}

gridItems.forEach(function (item) {
    item.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', function () {
    gridItems.forEach(function (item) {
        item.textContent = '';
        item.style.color = '';
    });
    winnerFound = false;
    document.getElementById('winner').innerHTML = 'Result';
    enableBoard();

    // reset char to 'X' to ensure player goes first
    char = 'X';
    reset.play();   
});


function checkFull() {
    if (gridItems[0].textContent != '' && gridItems[1].textContent != '' && gridItems[2].textContent != '' && gridItems[3].textContent != '' && gridItems[4].textContent != '' && gridItems[5].textContent != '' && gridItems[6].textContent != '' && gridItems[7].textContent != '' && gridItems[8].textContent != '' && checkWinner(char) === null) {
        document.getElementById('winner').innerHTML = 'Draw!';
        draw.play();
    }
    
}



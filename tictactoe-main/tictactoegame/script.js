var player = 1;
var gridItems = document.querySelectorAll('.grid-item');
var resetBtn = document.querySelector('.reset-btn');
var char = '';
var player1 = document.querySelector('.player1');
var computer = document.querySelector('.computer');
var playerScore = 1;
var computerScore = 1;
var winnerFound = false;
var winner;

//audio
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
    emptyItems[index].style.color = '#08BC6A';
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
        this.style.color = '#F22901';
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
        checkFull();


}

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
                document.getElementById('winner').innerHTML = '<span style="color: #F22901">You Won!</span>';
                document.getElementById('player').innerHTML = 'YOU: ' + playerScore++;
                winner = 'X';
                win.play();
            } else {
                document.getElementById('winner').innerHTML = '<span style="color: #08BC6A">CPU Won!</span>';
                document.getElementById('computer').innerHTML = 'CPU: ' + computerScore++;
                winner = 'O';
                lose.play();

            }
            winnerFound = true;
            drawLine();

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

    var startLine, endLine;
    var rect1, rect2;
    var startCenterX, startCenterY;
    var endCenterX, endCenterY;
    var canvas;
    var ctx;
    var startX, startY;
    var endX, endY;
    var lineWidth;
    var lineColor;

    switch (true) {
        case winningCombinations[0].every(cell => gridItems[cell].textContent === winner):
            startLine = document.getElementById("item1");
            endLine = document.getElementById("item3");

            rect1 = startLine.getBoundingClientRect();
            rect2 = endLine.getBoundingClientRect();

            startCenterX = rect1.left;
            startCenterY = rect1.top + rect1.height / 2;

            endCenterX = rect2.right;
            endCenterY = rect2.top + rect2.height / 2;

            canvas = document.getElementById("line");

            ctx = canvas.getContext("2d");

            startX = startCenterX;
            startY = startCenterY;

            endX = endCenterX;
            endY = endCenterY;

            lineWidth = 20;

            if (winner === 'X')
                lineColor = "red";
            else
                lineColor = "green";

            ctx.strokeStyle = lineColor;

            ctx.lineWidth = lineWidth;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            break;

        case winningCombinations[1].every(cell => gridItems[cell].textContent === winner):
            startLine = document.getElementById("item4");
            endLine = document.getElementById("item6");

            rect1 = startLine.getBoundingClientRect();
            rect2 = endLine.getBoundingClientRect();

            startCenterX = rect1.left;
            startCenterY = rect1.top + rect1.height / 2;

            endCenterX = rect2.right;
            endCenterY = rect2.top + rect2.height / 2;

            canvas = document.getElementById("line");

            ctx = canvas.getContext("2d");

            startX = startCenterX;
            startY = startCenterY;

            endX = endCenterX;
            endY = endCenterY;

            lineWidth = 20;

            if (winner === 'X')
                lineColor = "red";
            else
                lineColor = "green";

            ctx.strokeStyle = lineColor;

            ctx.lineWidth = lineWidth;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            break;
        case winningCombinations[2].every(cell => gridItems[cell].textContent === winner):
            startLine = document.getElementById("item7");
            endLine = document.getElementById("item9");

            rect1 = startLine.getBoundingClientRect();
            rect2 = endLine.getBoundingClientRect();

            startCenterX = rect1.left;
            startCenterY = rect1.top + rect1.height / 2;

            endCenterX = rect2.right;
            endCenterY = rect2.top + rect2.height / 2;

            canvas = document.getElementById("line");

            ctx = canvas.getContext("2d");

            startX = startCenterX;
            startY = startCenterY;

            endX = endCenterX;
            endY = endCenterY;

            lineWidth = 20;

            if (winner === 'X')
                lineColor = "red";
            else
                lineColor = "green";

            ctx.strokeStyle = lineColor;

            ctx.lineWidth = lineWidth;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            break;
        case winningCombinations[3].every(cell => gridItems[cell].textContent === winner):
            startLine = document.getElementById("item1");
            endLine = document.getElementById("item7");

            rect1 = startLine.getBoundingClientRect();
            rect2 = endLine.getBoundingClientRect();

            startCenterX = rect1.left + rect1.width / 2;
            startCenterY = rect1.top;

            endCenterX = rect2.left + rect2.width / 2;
            endCenterY = rect2.bottom;

            canvas = document.getElementById("line");

            ctx = canvas.getContext("2d");

            startX = startCenterX;
            startY = startCenterY;

            endX = endCenterX;
            endY = endCenterY;

            lineWidth = 20;

            if (winner === 'X')
                lineColor = "red";
            else
                lineColor = "green";

            ctx.strokeStyle = lineColor;

            ctx.lineWidth = lineWidth;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            break;
        case winningCombinations[4].every(cell => gridItems[cell].textContent === winner):
            startLine = document.getElementById("item2");
            endLine = document.getElementById("item8");

            rect1 = startLine.getBoundingClientRect();
            rect2 = endLine.getBoundingClientRect();

            startCenterX = rect1.left + rect1.width / 2;
            startCenterY = rect1.top;

            endCenterX = rect2.left + rect2.width / 2;
            endCenterY = rect2.bottom;

            canvas = document.getElementById("line");

            ctx = canvas.getContext("2d");

            startX = startCenterX;
            startY = startCenterY;

            endX = endCenterX;
            endY = endCenterY;

            lineWidth = 20;

            if (winner === 'X')
                lineColor = "red";
            else
                lineColor = "green";

            ctx.strokeStyle = lineColor;

            ctx.lineWidth = lineWidth;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            break;
        case winningCombinations[5].every(cell => gridItems[cell].textContent === winner):
            startLine = document.getElementById("item3");
            endLine = document.getElementById("item9");

            rect1 = startLine.getBoundingClientRect();
            rect2 = endLine.getBoundingClientRect();

            startCenterX = rect1.left + rect1.width / 2;
            startCenterY = rect1.top;

            endCenterX = rect2.left + rect2.width / 2;
            endCenterY = rect2.bottom;

            canvas = document.getElementById("line");

            ctx = canvas.getContext("2d");

            startX = startCenterX;
            startY = startCenterY;

            endX = endCenterX;
            endY = endCenterY;

            lineWidth = 20;

            if (winner === 'X')
                lineColor = "red";
            else
                lineColor = "green";

            ctx.strokeStyle = lineColor;

            ctx.lineWidth = lineWidth;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            break;

        case winningCombinations[6].every(cell => gridItems[cell].textContent === winner):
            startLine = document.getElementById("item1");
            endLine = document.getElementById("item9");

            rect1 = startLine.getBoundingClientRect();
            rect2 = endLine.getBoundingClientRect();

            startCenterX = rect1.left + 20;
            startCenterY = rect1.top + 20;

            endCenterX = rect2.right - 20;
            endCenterY = rect2.bottom - 20;

            canvas = document.getElementById("line");

            ctx = canvas.getContext("2d");

            startX = startCenterX;
            startY = startCenterY;

            endX = endCenterX;
            endY = endCenterY;

            lineWidth = 20;

            if (winner === 'X')
                lineColor = "red";
            else
                lineColor = "green";

            ctx.strokeStyle = lineColor;

            ctx.lineWidth = lineWidth;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            break;

        case winningCombinations[7].every(cell => gridItems[cell].textContent === winner):
            startLine = document.getElementById("item3");
            endLine = document.getElementById("item7");

            rect1 = startLine.getBoundingClientRect();
            rect2 = endLine.getBoundingClientRect();

            startCenterX = rect1.right - 20;
            startCenterY = rect1.top + 20;

            endCenterX = rect2.left + 20;
            endCenterY = rect2.bottom - 20;

            canvas = document.getElementById("line");

            ctx = canvas.getContext("2d");

            startX = startCenterX;
            startY = startCenterY;

            endX = endCenterX;
            endY = endCenterY;

            lineWidth = 20;

            if (winner === 'X')
                lineColor = "red";
            else
                lineColor = "green";

            ctx.strokeStyle = lineColor;

            ctx.lineWidth = lineWidth;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            break;
        default:
            break;
    }


    if (resetBtn.addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }));

}


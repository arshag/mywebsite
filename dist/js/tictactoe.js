// written by J Klavanian
var player = 0;
var board = [
    [-1,-1,-1],
    [-1,-1,-1],
    [-1,-1,-1]
];
var reset = false;
var turns = 1;
var gameOver = false;
var state = document.getElementById("status");
state.innerHTML = `<h2>Game On - Your turn`;
let event = new Event('reset');

function markCell(e) {
    // mark move on screen and game matrix
    if (reset) {
        resetGame();
        return;
    }
    if (player == 0)
        this.style.backgroundColor = "#FA2208";
    
    var position = e.currentTarget.dataset.pos;
    var boardY = position % 3;
    var boardX = Math.floor(position / 3);
    board[boardX][boardY] = player;

    if (gameOverCheck()) {
        state.innerHTML = `<h2>Game over - You Win - \nClick anywhere on board to start a new game<h2>`;
        reset = true;
    }
    else if (turns == 9) {
        state.innerHTML = `<h2>Game over - DRAW<h2>`;
        reset = true;
    }
    else {
        player =  2;
        state.innerHTML = `<h2>Player ${player}'s Turn<h2>`;
        turns++;
        if (player == 2)
            computerMoves(e);
    }
    
    console.table(board);
}
function gameOverCheck() {
    if (rowsSame()) 
        return true;
    else    
        return false;
}

function rowsSame() {
    if (board[0][0] == player && board[0][1] == player && board[0][2] == player)
        return true;
    else if (board[1][0] == player && board[1][1] == player && board[1][2] == player)
        return true;
    else if (board[2][0] == player && board[2][1] == player && board[2][2] == player)
        return true;
    else if (board[0][0] == player && board[1][0] == player && board[2][0] == player)
        return true;
    else if (board[0][1] == player && board[1][1] == player && board[2][1] == player)
        return true;
    else if (board[0][2] == player && board[1][2] == player && board[2][2] == player)
        return true;
    else if (board[0][0] == player && board[1][1] == player && board[2][2] == player)
        return true;
    else if (board[0][2] == player && board[1][1] == player && board[2][0] == player)
        return true;
    else
        return false;
}

function firstPosAvailable() {
    var x,y,pos;
    for (x = 0; x<3; x++) 
        for (y = 0; y<3; y++)
            if (board[x][y] == -1) {
                var pos = 3*x + y;
                cells[pos].style.backgroundColor = "#D5F743";
                board[x][y] = player;
                return;
            }
}
function winningPos() {
    var pos;
    for (var i = 0; i<3; i++) {
        if (JSON.stringify(board[i]) === JSON.stringify([-1,2,2])) {
            pos = i*3+0;
            break;
        }
        if (JSON.stringify(board[i]) === JSON.stringify([2,-1,2])) {
            pos = i*3+1;
            break;
        }
        if (JSON.stringify(board[i]) === JSON.stringify([2,2,-1])) {
            pos = i*3+2;
            break;
        }
        if (JSON.stringify(board.map(function(value, index) { return value[i];}))=== JSON.stringify([-1,2,2])) {
            pos = i;
            break;
        }
        if (JSON.stringify(board.map(function(value, index) { return value[i];}))=== JSON.stringify([2,-1,2])) {
            pos = i+3;
            break;
        }
        if (JSON.stringify(board.map(function(value, index) { return value[i];}))=== JSON.stringify([2,2,-1])) {
            pos = i+6;
            break;
        }
    }
    if (typeof pos === 'undefined') {
        // check diagonals
        var temp = Array();
        temp.push(board[0][0]);
        temp.push(board[1][1]);
        temp.push(board[2][2]);

        if (JSON.stringify(temp) === JSON.stringify([-1,2,2])) {
            pos = 0;
        }
        else if (JSON.stringify(temp) === JSON.stringify([2,-1,2])) {
            pos = 4;
        }
        else if (JSON.stringify(temp) === JSON.stringify([2,2,-1])) {
            pos = 8;
        }
    }
    if (typeof pos === 'undefined') {
        // check diagonals
        temp = Array();
        temp.push(board[2][2]);
        temp.push(board[1][1]);
        temp.push(board[0][0]);

        if (JSON.stringify(temp) === JSON.stringify([-1,2,2])) {
            pos = 2;
        }
        else if (JSON.stringify(temp) === JSON.stringify([2,-1,2])) {
            pos = 4;
        }
        else if (JSON.stringify(temp) === JSON.stringify([2,2,-1])) {
            pos = 6;
        }
    }
    if (typeof pos !== 'undefined') {
        cells[pos].style.backgroundColor = "#D5F743";
        boardY = pos % 3;
        boardX = Math.floor(pos / 3);
        board[boardX][boardY] = player;
        return true;
    }
    else
        return false;
}

function blockOpponentWinning() {
    var pos;
    for (var i = 0; i<3; i++) {
        if (JSON.stringify(board[i]) === JSON.stringify([-1,0,0])) {
            pos = i*3+0;
            break;
        }
        if (JSON.stringify(board[i]) === JSON.stringify([0,-1,0])) {
            pos = i*3+1;
            break;
        }
        if (JSON.stringify(board[i]) === JSON.stringify([0,0,-1])) {
            pos = i*3+2;
            break;
        }
        if (JSON.stringify(board.map(function(value, index) { return value[i];}))=== JSON.stringify([-1,0,0])) {
            pos = i;
            break;
        }
        if (JSON.stringify(board.map(function(value, index) { return value[i];}))=== JSON.stringify([0,-1,0])) {
            pos = i+3;
            break;
        }
        if (JSON.stringify(board.map(function(value, index) { return value[i];}))=== JSON.stringify([0,0,-1])) {
            pos = i+6;
            break;
        }
    }
    if (typeof pos === 'undefined') {
        // check diagonals
        var temp = Array();
        temp.push(board[0][0]);
        temp.push(board[1][1]);
        temp.push(board[2][2]);

        if (JSON.stringify(temp) === JSON.stringify([-1,0,0])) {
            pos = 0;
        }
        else if (JSON.stringify(temp) === JSON.stringify([0,-1,0])) {
            pos = 4;
        }
        else if (JSON.stringify(temp) === JSON.stringify([0,0,-1])) {
            pos = 8;
        }
    }
    if (typeof pos === 'undefined') {
        // check diagonals
        temp = Array();
        temp.push(board[0][2]);
        temp.push(board[1][1]);
        temp.push(board[2][0]);

        if (JSON.stringify(temp) === JSON.stringify([-1,0,0])) {
            pos = 2;
        }
        else if (JSON.stringify(temp) === JSON.stringify([0,-1,0])) {
            pos = 4;
        }
        else if (JSON.stringify(temp) === JSON.stringify([0,0,-1])) {
            pos = 6;
        }
    }
    if (typeof pos !== 'undefined') {
        cells[pos].style.backgroundColor = "#D5F743";
        boardY = pos % 3;
        boardX = Math.floor(pos / 3);
        board[boardX][boardY] = player;
        return true;
    }
    else
        return false;
}
function computerMoves(e) {
    //get first open pos
    if (winningPos()) {
        console.log('computer won');
    } else if (blockOpponentWinning()) {
        console.log('blocked opponent');
    }
    else {
        firstPosAvailable();
    }
    if (gameOverCheck()) {
        state.innerHTML = `<h2>Game over - Computer Wins - \nClick anywhere on board to start a new game<h2>`;
        reset = true;
    }
    else {
        player = 0;
        state.innerHTML = `<h2>Player ${player}'s Turn<h2>`;
        turns++;
    }
}

function resetGame() {
    player = 0;
    board = [
        [-1,-1,-1],
        [-1,-1,-1],
        [-1,-1,-1]
    ];
    for (const cell of cells) {
        cell.style.backgroundColor = "#cccccc";
    }
    turns = 1;
    gameOver = false;
    state.innerHTML = `<h2>Game On - Your turn`;
    reset = false;
}

var cells = document.querySelectorAll(".grid > div");
for (const cell of cells) {
    cell.addEventListener("click", markCell);
}

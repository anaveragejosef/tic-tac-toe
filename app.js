// Create variable to track turn
var turnCounter = {
  x: true
};
var boardSpaces = {
  topLeft: true,
  midLeft: true,
  botLeft: true,
  topCenter: true,
  midCenter: true,
  botCenter: true,
  topRight: true,
  midRight: true,
  botRight: true
}
var scoreboard = {
  x: 0,
  o: 0
}
var gameOver = false;
var lastWinner = 'X';

// Create function that updates tiles
var addPiece = id => {
  // Check if move is valid
  if (boardSpaces[id] && !gameOver) {
    // AddPiece then calls PlacePiece
    placePiece(id);
    updateBoardSpace(id);
  }
  var winner = checkForWinner();
  if (winner) {
    updateWinner(winner);
    updateScoreboard(winner);
  } else if (isBoardFull()) {
    updateTie();
  }
}

var placePiece = id => {
  // Find out who's turn it is
  var player = calculateTurn();
  // PlacePiece then adds X or O based on current turn
  document.getElementById(id).innerHTML = player;
}

var calculateTurn = () => {
  // Find who's turn it is, using the obj
  if (turnCounter.x) {
    var currentTurn = 'X';
  } else {
    var currentTurn = 'O';
  }
  // Switch the state so it will move turns
  turnCounter.x = !turnCounter.x;
  // Return player for current turn
  return currentTurn;
}

var updateBoardSpace = id => {
  boardSpaces[id] = !boardSpaces[id];
}

var isBoardFull = () => {
  for (var key in boardSpaces) {
    if (boardSpaces[key]) {
      return false;
    }
  }
  gameOver = true;
  return true;
}

var updateWinner = winner => {
  document.getElementById('user-alert').innerHTML = `${winner} won!`;
  lastWinner = winner;
}

var updateScoreboard= winner => {
  winner = winner.toLowerCase();
  scoreboard[winner] += 1;
  document.getElementById(`${winner}-score`).innerHTML = scoreboard[winner];
}

var updateTie = () => {
  document.getElementById('user-alert').innerHTML = 'A strange game. The only winning move is not to play.';
}

var resetGameBoard = () => {
  var gameBoard = document.getElementsByClassName('tile');
  // On click, iterate through tile divs
  for (let i = 0; i < gameBoard.length; i++) {
    // Set inner htmls to ''
    gameBoard[i].innerHTML = null;
  }
  // Reset board and objs
  if (lastWinner === 'X') {
    turnCounter.x = true;
  } else {
    turnCounter.x = false;
  }

  gameOver = false;
  document.getElementById('user-alert').innerHTML = null;
  resetBoardObj();
}

var resetBoardObj = () => {
  for (var key in boardSpaces) {
    if (!boardSpaces[key]) {
      boardSpaces[key] = true;
    }
  }
}

// TODO: Create function that checks for winner
  // TODO: Create possible winning board arrays
var checkForWinner = () => {
  var gameBoard = document.getElementsByClassName('tile');
  var topRow = [gameBoard[0].innerHTML, gameBoard[3].innerHTML, gameBoard[6].innerHTML];
  var midRow = [gameBoard[1].innerHTML, gameBoard[4].innerHTML, gameBoard[7].innerHTML];
  var botRow = [gameBoard[2].innerHTML, gameBoard[5].innerHTML, gameBoard[8].innerHTML];
  var board = [topRow, midRow, botRow];
  // Row Check
  var winner = rowChecker(board);
  if (winner) return winner;

  // Column Check
  winner = colChecker(board);
  if (winner) return winner;

  // Check major/minor diagonal
  winner = majorChecker(board);
  if (winner) return winner;

  // Check for minor diagonal
  winner = minorChecker(board);
  if (winner) return winner;
}

var rowChecker = board => {
  // Iterate through each row
  for (let r = 0; r < board.length; r++) {
    // Create X and O counter
    var xCount = 0;
    var oCount = 0;
    // Check each element
    for (let c = 0; c < board[r].length; c++) {
      // Increment counters
      if (board[r][c] === 'X') {
        xCount++;
        // If the counter = 3, game over
        if (xCount === 3) {
          gameOver = true;
          return 'X';
        }
      }
      if (board[r][c] === 'O') {
        oCount++;
        if (oCount === 3) {
          gameOver = true;
          return 'O';
        }
      }
    }
  }
}

// Iterate through each col
var colChecker = board => {
  for (let c = 0; c < board.length; c++) {
    // Create X and O counter
    var xCount = 0;
    var oCount = 0;
    // Check each row at that col
    for (let r = 0; r < board.length; r++) {
      // Increment counters
      if (board[r][c] === 'X') {
        xCount++;
        // If the counter = 3, game over
        if (xCount === 3) {
          gameOver = true;
          return 'X';
        }
      }
      if (board[r][c] === 'O') {
        oCount++;
        if (oCount === 3) {
          gameOver = true;
          return 'O';
        }
      }
    }
  }
}

var majorChecker = board => {
  // Check major diagonal
  var xMajCount = 0;
  var oMajCount = 0;
  for (let r = 0; r < board.length; r++) {
    if (board[r][r] === 'X') {
      xMajCount++;
      // If the counter = 3, game over
      if (xMajCount === 3) {
        gameOver = true;
        return 'X';
      }
    }
    if (board[r][r] === 'O') {
      oMajCount++;
      if (oMajCount === 3) {
        gameOver = true;
        return 'O';
      }
    }
  }
}

var minorChecker = board => {
  var xMinCount = 0;
  var oMinCount = 0;
  for (let r = 0; r < board.length; r++) {
    let minIndex = (board.length - 1) - r;
    if (board[r][minIndex] === 'X') {
      xMinCount++;
      // If the counter = 3, game over
      if (xMinCount === 3) {
        gameOver = true;
        return 'X';
      }
    }
    if (board[r][minIndex] === 'O') {
      oMinCount++;
      if (oMinCount === 3) {
        gameOver = true;
        return 'O';
      }
    }
  }
}
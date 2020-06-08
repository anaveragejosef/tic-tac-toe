// Create variable to track turn
var turnCounter = 1;
var gameOver = false;

// Create function that updates tiles
var addPiece = id => {
  var inner = document.getElementById(id).innerHTML;
  // Check if the tile has an inner html that is null
  if (!inner && gameOver === false) {
    // Change the div to the turn tracker (odd = X, even = 0)
    turnCounter % 2 === 0 ? document.getElementById(id).innerHTML = 'O' : document.getElementById(id).innerHTML = 'X';
    // Tracker increments
    turnCounter++;
  } else {
    alert('Invalid Move, Please Try Again');
  }
  // Call winner checker to see if game is over
  var winner = checkForWinner();
  if (gameOver) {
    document.getElementById('user-alert').innerHTML = `${winner} won!`;
  }
  // Check if there are any further moves
  if (!gameOver && turnCounter === 10) {
    document.getElementById('user-alert').innerHTML = 'A strange game. The only winning move is not to play.';
  }
};

// TODO: Create function that checks for winner
  // TODO: Create possible winning board arrays
var checkForWinner = () => {
  var gameBoard = document.getElementsByClassName('tile');
  var topRow = [gameBoard[0].innerHTML, gameBoard[3].innerHTML, gameBoard[6].innerHTML];
  var midRow = [gameBoard[1].innerHTML, gameBoard[4].innerHTML, gameBoard[7].innerHTML];
  var botRow = [gameBoard[2].innerHTML, gameBoard[5].innerHTML, gameBoard[8].innerHTML];
  var board = [topRow, midRow, botRow];
  // Row Check
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

  // Column Check
  // Iterate through each col
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

  // Check major/minor diagonal
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

  // Check for minor diagonal
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


// Create function that resets game board
var resetGameBoard = () => {
  var gameBoard = document.getElementsByClassName('tile');
  // On click, iterate through tile divs
  for (let i = 0; i < gameBoard.length; i++) {
    // Set inner htmls to ''
    gameBoard[i].innerHTML = null;
  }
  // Reset turn tracker to 1
  turnCounter = 1;
  gameOver = false;
  document.getElementById('user-alert').innerHTML = null;
}
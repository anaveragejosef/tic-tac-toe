// Create variable to track turn
var turnCounter = 1;

// Create function that updates tiles
var addPiece = id => {
  var inner = document.getElementById(id).innerHTML;
  // Check if the tile has an inner html that is null
  if (!inner) {
    // Change the div to the turn tracker (odd = X, even = 0)
    turnCounter % 2 === 0 ? document.getElementById(id).innerHTML = 'O' : document.getElementById(id).innerHTML = 'X';
    // Tracker increments
    turnCounter++;
    // Call winner checker if turn count >= 5
  } else {
    alert('Invalid Move, Please Try Again');
  }
};

// TODO: Create function that checks for winner
  // TODO: Create possible winning board arrays


// TODO: Create function that resets game board
var resetGameBoard = () => {
  var gameBoard = (document.getElementsByClassName('tile'));
  // On click, iterate through tile divs
  for (let i = 0; i < gameBoard.length; i++) {
    // Set inner htmls to ''
    gameBoard[i].innerHTML = null;
  }
  // Reset turn tracker to 1
  turnCounter = 1;
}
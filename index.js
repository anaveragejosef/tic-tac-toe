// // Install Express
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Here we are');
  Score.findAll().then((score) => {

  })
});

app.listen(port, () => console.log(`Server is running and listening on port ${port}`));
// Create Game State Obj
var gameState = {
  xTurnCounter: true,
  boardSpaces: {
    topLeft: true,
    midLeft: true,
    botLeft: true,
    topCenter: true,
    midCenter: true,
    botCenter: true,
    topRight: true,
    midRight: true,
    botRight: true
  },
  scoreboard: {
    x: 0,
    o: 0
  },
  gameOver: false,
  winnerSet: false,
  lastWinner: 'X'
};

select * from scores,
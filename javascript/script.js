const GameBoard = (function () {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  return { board };
})();

GameBoard.board[0][1] = 2;
console.log(GameBoard.board);

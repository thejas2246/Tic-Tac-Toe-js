const GameBoard = (function () {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const clearBoard = function () {
    let length = board.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        board[i][j] = "";
      }
    }
  };

  return { board, clearBoard };
})();

const Player = function (name) {
  let playerName = name;
  return { playerName };
};

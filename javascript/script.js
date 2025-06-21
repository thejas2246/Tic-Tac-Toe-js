const GameBoard = (function () {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let winner = "";
  let nextPlayer = "X";
  let gameOver = false;
  const updatePlayer = function () {
    nextPlayer = nextPlayer == "X" ? "O" : "X";
  };

  const getNextPlayer = function () {
    return nextPlayer;
  };

  const clearBoard = function () {
    let length = board.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        board[i][j] = "";
      }
    }
  };

  const updateBoard = function (index1, index2, value) {
    board[index1][index2] = value;
  };

  const displayBoard = function () {
    const div = document.querySelectorAll(".child-container");
    let i = 0;
    let j = 0;
    div.forEach((item) => {
      item.textContent = board[i][j];
      j++;
      if (j == 3) {
        j = 0;
        i++;
      }
    });
  };

  const checkWin = function () {
    let length = board.length;
    console.log(board);
    for (let i = 0; i < length; i++) {
      if (
        board[i][0] == nextPlayer &&
        board[i][1] == nextPlayer &&
        board[i][2] == nextPlayer
      ) {
        updateGameOverStatus();
      }
      if (
        board[0][i] == nextPlayer &&
        board[1][i] == nextPlayer &&
        board[2][i] == nextPlayer
      ) {
        updateGameOverStatus();
      }
    }
    if (
      board[0][0] == nextPlayer &&
      board[1][1] == nextPlayer &&
      board[1][1] == nextPlayer
    )
      updateGameOverStatus();
    if (
      board[0][2] == nextPlayer &&
      board[1][1] == nextPlayer &&
      board[2][0] == nextPlayer
    )
      updateGameOverStatus();
  };
  const getGameOverStatus = function () {
    return gameOver;
  };
  const updateGameOverStatus = function () {
    gameOver = true;
  };

  return {
    clearBoard,
    updateBoard,
    displayBoard,
    updatePlayer,
    getNextPlayer,
    checkWin,
    getGameOverStatus,
  };
})();

const Player = function (name) {
  let playerName = name;
  return { playerName };
};

const createGrid = function () {
  const gridContainer = elementCreator("div", "class", "grid-container");
  appendElement(gridContainer, document.body);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let div = elementCreator("div", "class", "child-container");
      div.setAttribute("data-value", `${i}${j}`);
      appendElement(div, gridContainer);
      addEventListenersTOElements(div);
    }
  }
};

const setValueOnClick = function (e) {
  let index = e.target.getAttribute("data-value");
  let [position1, position2] = index.split("");
  value = GameBoard.getNextPlayer();
  GameBoard.updateBoard(position1, position2, value);
  GameBoard.displayBoard();
  GameBoard.checkWin();
  console.log(GameBoard.gameOver);
  if (GameBoard.getGameOverStatus()) {
    removeEventListener();
  } else {
    GameBoard.updatePlayer();
  }
};

const elementCreator = function (element, type, name) {
  let newElement = document.createElement(element);
  newElement.setAttribute(type, name);
  return newElement;
};

const appendElement = function (elementToAppend, appendTo) {
  appendTo.appendChild(elementToAppend);
};

const addEventListenersTOElements = function (element) {
  element.addEventListener("click", setValueOnClick, { once: true });
};

const removeEventListener = function () {
  let removeElement = document.querySelectorAll(".child-container");
  removeElement.forEach((item) => {
    item.removeEventListener("click", setValueOnClick, { once: true });
  });
};
const playGame = function () {
  const player1 = Player("X");
  const player2 = Player("O");
  createGrid();
};

playGame();

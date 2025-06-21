const Player = function (name) {
  let playerName = name;
  return { playerName };
};

const player1 = Player("player 1");
const player2 = Player("player 2");
const GameBoard = (function () {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let winner = "";
  let nextPlayer = "X";
  let gameOver = false;
  let gameTie = false;
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
      board[2][2] == nextPlayer
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
  const updateGameTieStatus = function () {
    gameTie = true;
  };
  const getGameTieStatus = function () {
    return gameTie;
  };
  const checkTie = function () {
    let spaceCount = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] == "") {
          spaceCount++;
        }
      }
    }
    if (spaceCount == 0) {
      updateGameTieStatus();
    }
  };
  const winnerGreetings = function () {
    console.log(
      nextPlayer == "X"
        ? `${player1.playerName} won`
        : `${player2.playerName} won`
    );
  };
  return {
    clearBoard,
    updateBoard,
    displayBoard,
    updatePlayer,
    getNextPlayer,
    checkWin,
    getGameOverStatus,
    checkTie,
    getGameTieStatus,
    winnerGreetings,
  };
})();

const createGrid = function (player1, player2) {
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
  GameBoard.checkTie();
  if (GameBoard.getGameOverStatus()) {
    removeEventListener();
    GameBoard.winnerGreetings();
  } else if (GameBoard.getGameTieStatus()) {
    console.log("Game tie");
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
  createGrid();
};

playGame();

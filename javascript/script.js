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

const functionCreateGrid = function () {
  const gridContainer = elementCreator("div", "class", "grid-container");
  appendElement(gridContainer, document.body);
};

const elementCreator = function (element, type, name) {
  let newElement = document.createElement(element);
  newElement.setAttribute(type, name);
  return newElement;
};

const appendElement = function (elementToAppend, appendTo) {
  appendTo.appendChild(elementToAppend);
};

functionCreateGrid();

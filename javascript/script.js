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

  return { clearBoard, updateBoard, displayBoard };
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
      addEventListnersTOElements(div);
    }
  }
};

const setValueOnClick = function (e) {
  let index = e.target.getAttribute("data-value");
  let [position1, position2] = index.split("");
  value = "X";
  GameBoard.updateBoard(position1, position2, value);
  GameBoard.displayBoard();
};

const elementCreator = function (element, type, name) {
  let newElement = document.createElement(element);
  newElement.setAttribute(type, name);
  return newElement;
};

const appendElement = function (elementToAppend, appendTo) {
  appendTo.appendChild(elementToAppend);
};

const addEventListnersTOElements = function (element) {
  element.addEventListener("click", setValueOnClick, { once: true });
};

createGrid();

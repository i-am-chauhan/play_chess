const indexToId = ([row, col]) => row * 8 + col;

const getSymbol = function (soldier) {
  const symbols = {
    K: '&#9812',
    Q: '&#9813',
    H: '&#9816',
    B: '&#9815',
    R: '&#9814',
    P: '&#9817',
    k: '&#9818',
    q: '&#9819',
    h: '&#9822',
    b: '&#9821',
    r: '&#9820',
    p: '&#9823',
    " ": ""
  }
  return symbols[soldier];
}

const chooseClass = function (move) {
  let colors = ['silver', 'white'];
  return colors[((move[0] % 2) + move[1]) % 2];
}

const bringBGToDefault = function (move) {
  let id = indexToId(move);
  let format = chooseClass(move);
  document.getElementById(id).setAttribute('class', format);
}

const insertTableContent = (id, content, move) => {
  return `<td id="${id}" class="${chooseClass(move)}">${content}</td>`;
}

const insertRowsInTable = function (rows) {
  document.getElementById('chessBoard').innerHTML = rows;
}

const formatBoard = function (board) {
  let table = "";
  for (let row = 0; row < board.length; row++) {
    let tableRow = '<tr>'
    for (let col = 0; col < board[row].length; col++) {
      let id = indexToId([row, col]);
      let symbol = getSymbol(board[row][col]);
      tableRow += insertTableContent(id, symbol, [row, col]);
    }
    tableRow += '</tr>'
    table += tableRow;
  }
  return insertRowsInTable(table)
}

const highLightCell = (cell, color) => {
  let id = indexToId(cell);
  document.getElementById(id).setAttribute('class', color);
}

const highLighter = (currPosition,moves) => {
  highLightCell(currPosition, 'yellow');
  moves.map(move => highLightCell(move, 'red'));
}

const stopGame = (army) => {
  document.getElementById('chessBoard').setAttribute('onclick', "");
  document.getElementById('victoryMessage').innerText = `${army} army won.`
}
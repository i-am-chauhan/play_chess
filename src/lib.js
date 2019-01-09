const idToIndex = (id) => [Math.floor(id / 8), id % 8];

const whiteArmy = function () {
  return {
    K: King,
    Q: Queen,
    H: Knight,
    B: Bishop,
    R: Rook,
    P: Pawn
  };
};

const blackArmy = function () {
  return {
    k: King,
    q: Queen,
    h: Knight,
    b: Bishop,
    r: Rook,
    p: Pawn
  };
};

const createBoard = function () {
  return new Array(8).fill([]).map(x => new Array(8).fill(" "));
};

const createInitialBoard = function () {
  const board = createBoard();
  board[0] = ["r", "h", "b", "k", "q", "b", "h", "r"];
  board[1] = new Array(8).fill("p");
  board[6] = new Array(8).fill("P");
  board[7] = ["R", "H", "B", "Q", "K", "B", "H", "R"];
  return board;
};

const contains = function (set, subset) {
  return set.some(
    element => element[0] == subset[0] && element[1] == subset[1]
  );
};

const getArmy = function (symbol) {
  if (symbol == " ") return { siblings: [], army: "" };
  if (Object.keys(whiteArmy()).includes(symbol))
    return { siblings: whiteArmy(), army: "white" };
  return { siblings: blackArmy(), army: "black" };
};

const isMovePossible = function (allPossibleMoves, move) {
  return contains(allPossibleMoves, move);
};

const isPlaceEmpty = function (move, board) {
  return board[move[0]][move[1]] == " ";
}

const notSiblingError = function () {
  alert("Please! choose your piece.");
}

const getInvalidMessage = () => {
  alert("Not a valid move.");
}

const setAttributeToPlaceMove = () => {
  document.getElementById('chessBoard').setAttribute('onclick', "placeMove(event.target.getAttribute('id'))");
}

const setAttributeToGetPiece = () => {
  document.getElementById('chessBoard').setAttribute('onclick', "getPiece(event.target.getAttribute('id'))");
}

let board = createInitialBoard();
let currArmy = ["white", "black"];
let pieceType = "";
let currentPosition = [0, 0];
let allPossibleMoves = [];
let symbol;
let count = 0;

const getPiece = function (id) {
  bringBGToDefault(currentPosition);
  allPossibleMoves.map(bringBGToDefault);
  currentPosition = idToIndex(id);
  symbol = board[currentPosition[0]][currentPosition[1]];
  const { siblings, army } = getArmy(symbol);
  if (army != currArmy[count % 2]) return notSiblingError();
  pieceType = siblings[symbol];
  const family = Object.keys(siblings);
  const soldier = new pieceType(currentPosition, board, family, army);
  allPossibleMoves = soldier.allValidPossibleMoves();
  highLighter(currentPosition, allPossibleMoves);
  setAttributeToPlaceMove();
};

const placeMove = function (id) {
  let enemyEmperor = { white: "k", black: "K" };
  let move = idToIndex(id);
  setAttributeToGetPiece();
  if (!isMovePossible(allPossibleMoves, move)) return getInvalidMessage();
  let opponent = board[move[0]][move[1]];
  board[move[0]][move[1]] = symbol;
  board[currentPosition[0]][currentPosition[1]] = " ";
  formatBoard(board);
  let army = currArmy[count % 2];
  if (opponent == enemyEmperor[army]) return stopGame(army);
  count++;
};

formatBoard(board);
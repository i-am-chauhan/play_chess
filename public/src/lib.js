const idToIndex = id => {
  return { X: Math.floor(id / 8), Y: id % 8 };
};

const whiteArmyInfo = function() {
  return {
    K: { type: King, postion: new Position(7, 4) },
    Q: { type: Queen, postion: new Position(7, 3) },
    H1: { type: Knight, postion: new Position(7, 1) },
    H2: { type: Knight, postion: new Position(7, 6) },
    B1: { type: Bishop, postion: new Position(7, 2) },
    B2: { type: Bishop, postion: new Position(7, 5) },
    R1: { type: Rook, postion: new Position(7, 0) },
    R2: { type: Rook, postion: new Position(7, 7) },
    P1: { type: Pawn, postion: new Position(6, 0) },
    P2: { type: Pawn, postion: new Position(6, 1) },
    P3: { type: Pawn, postion: new Position(6, 2) },
    P4: { type: Pawn, postion: new Position(6, 3) },
    P5: { type: Pawn, postion: new Position(6, 4) },
    P6: { type: Pawn, postion: new Position(6, 5) },
    P7: { type: Pawn, postion: new Position(6, 6) },
    P8: { type: Pawn, postion: new Position(6, 7) }
  };
};

const blackArmyInfo = function() {
  return {
    k: { type: King, postion: new Position(0, 4) },
    q: { type: Queen, postion: new Position(0, 3) },
    h1: { type: Knight, postion: new Position(0, 1) },
    h2: { type: Knight, postion: new Position(0, 6) },
    b1: { type: Bishop, postion: new Position(0, 2) },
    b2: { type: Bishop, postion: new Position(0, 5) },
    r1: { type: Rook, postion: new Position(0, 0) },
    r2: { type: Rook, postion: new Position(0, 7) },
    p1: { type: Pawn, postion: new Position(1, 0) },
    p2: { type: Pawn, postion: new Position(1, 1) },
    p3: { type: Pawn, postion: new Position(1, 2) },
    p4: { type: Pawn, postion: new Position(1, 3) },
    p5: { type: Pawn, postion: new Position(1, 4) },
    p6: { type: Pawn, postion: new Position(1, 5) },
    p7: { type: Pawn, postion: new Position(1, 6) },
    p8: { type: Pawn, postion: new Position(1, 7) }
  };
};

const createBoard = function() {
  return new Array(8).fill([]).map(() => new Array(8).fill(" "));
};

const createInitialBoard = function() {
  const board = createBoard();
  board[0] = ["r1", "h1", "b1", "q", "k", "b2", "h2", "r2"];
  board[1] = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];
  board[6] = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"];
  board[7] = ["R1", "H1", "B1", "Q", "K", "B2", "H2", "R2"];
  return board;
};

const notSiblingError = function() {
  alert("Please! choose your piece.");
};

const getInvalidMessage = () => {
  alert("Not a valid move.");
};

let count = 0;

const getPiece = function(game, id) {
  const currentPosition = idToIndex(id);
  game.setCurrentSoldier(currentPosition);
  if (!game.isSoldierValid()) return notSiblingError();
  highLighter(currentPosition, game.getCurrSoldierMoves(), game.board);
  count = 1 - count;
};

const placeMove = function(game, id) {
  let move = idToIndex(id);
  if (!game.isMoveValid(move)) return getInvalidMessage();
  game.placeMove(move);
  formatBoard(game.board);
  count = 1 - count;
  if (game.isCheck()) {
    if (!game.isNotCheckAndMate()) {
      console.log('hello');
      alert("check&Mate");
      game.toggleCurrArmy();
      count = 100;
      return
    }
    alert("check");
  }
  game.toggleCurrArmy();
};

const getSoldiers = function(allSoldierInfos, nameOfTeam) {
  const armyInfo = {};
  const soldiers = Object.keys(allSoldierInfos);
  soldiers.forEach(soldier => {
    const Cadet = allSoldierInfos[soldier].type;
    const postion = allSoldierInfos[soldier].postion;
    armyInfo[soldier] = new Cadet(postion, soldiers, nameOfTeam);
  });
  return armyInfo;
};

const createGame = function() {
  const board = createInitialBoard();
  const whiteArmySoldierInfos = whiteArmyInfo();
  const blackArmySoldierInfos = blackArmyInfo();
  const whiteArmySoldiers = getSoldiers(whiteArmySoldierInfos, "white");
  const blackArmySoldiers = getSoldiers(blackArmySoldierInfos, "black");
  const whiteArmy = new Army(whiteArmySoldiers, "white");
  const blackArmy = new Army(blackArmySoldiers, "black");
  return new Game(whiteArmy, blackArmy, board);
};

const startGame = function() {
  const game = createGame();
  const currFunc = [getPiece, placeMove];
  const chessBoard = document.getElementById("chessBoard");
  chessBoard.onclick = () => {
    const id = event.target.getAttribute("id");
    currFunc[count](game, id);
  };
};

window.onload = () => {
  const board = createInitialBoard();
  formatBoard(board);
  startGame();
};

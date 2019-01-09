class Pawn {
  constructor(position, board, family, team) {
    this.position = position;
    this.team = team;
    this.difference = {};
    this.difference.black = [[1, 0], [1, 1], [1, -1]];
    this.difference.white = [[-1, 0], [-1, -1], [-1, 1]];
    this.board = board;
    this.family = family;
  }

  placeMove(diff) {
    return [this.position[0] + diff[0], this.position[1] + diff[1]];
  }

  allPossibleMoves() {
    const diffs = this.difference[this.team];
    const runningPossibles = diffs.slice(0, 1).map(this.placeMove, this);
    const killingPossibles = diffs.slice(1).map(this.placeMove, this);
    return { runningPossibles, killingPossibles };
  }

  filterMoves(move) {
    return move.every(index => index >= 0 && index < 8);
  }

  possibleMovesInBoard() {
    const { runningPossibles, killingPossibles } = this.allPossibleMoves();
    const runningMoves = runningPossibles.filter(this.filterMoves);
    const killingMoves = killingPossibles.filter(this.filterMoves);
    return { runningMoves, killingMoves };
  }

  isMoveValid(position) {
    let possibleBarriers = this.family.concat(" ");
    let pieceOnPlace = this.board[position[0]][position[1]];
    return !possibleBarriers.includes(pieceOnPlace);
  }

  allValidPossibleMoves() {
    const { runningMoves, killingMoves } = this.possibleMovesInBoard();
    const straightMove = runningMoves.filter(
      move => board[move[0]][move[1]] == " "
    );
    const diagonalMoves = killingMoves.filter(this.isMoveValid, this);
    return straightMove.concat(diagonalMoves);
  }
}

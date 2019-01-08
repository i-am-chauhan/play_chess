class Knight {
  constructor(position, board, family) {
    this.position = position;
    this.board = board;
    this.family = family;
  }

  getAllCombinations(firstList, secondList) {
    return firstList.reduce(function(allCombinations, element) {
      return allCombinations.concat(secondList.map(x => [element, x]));
    }, []);
  }

  possibleMoveDifferences() {
    const moveDifference = this.getAllCombinations(
      [1, -1, 2, -2],
      [1, -1, 2, -2]
    );
    return moveDifference.filter(x => Math.abs(x[0]) != Math.abs(x[1])).sort();
  }

  allPossibleMoves() {
    return this.possibleMoveDifferences().map(x => [
      x[0] + this.position[0],
      x[1] + this.position[1]
    ]);
  }

  possibleMovesInBoard() {
    const allMoves = this.allPossibleMoves().filter(cell =>
      cell.every(index => index >= 0 && index < 8)
    );
    return { allMoves };
  }

  isMoveValid(position) {
    let pieceOnPlace = this.board[position[0]][position[1]];
    return !this.family.includes(pieceOnPlace);
  }

  allValidPossibleMoves() {
    const { allMoves } = this.possibleMovesInBoard();
    return allMoves.filter(this.isMoveValid, this);
  }
}

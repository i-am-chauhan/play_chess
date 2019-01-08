class King {
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

  allPositionDiffs() {
    return this.getAllCombinations([0, 1, -1], [0, 1, -1])
      .slice(1)
      .sort();
  }

  allPossibleMoves() {
    return this.allPositionDiffs().map(x => [
      this.position[0] + x[0],
      this.position[1] + x[1]
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

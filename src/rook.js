class Rook {
  constructor(position, board, family) {
    this.position = position;
    this.positiveIndexDiffs = [1, 2, 3, 4, 5, 6, 7];
    this.negativeIndexDiffs = [-1, -2, -3, -4, -5, -6, -7];
    this.board = board;
    this.family = family;
  }

  zip(firstList, secondList) {
    return firstList.map((element, index) => [element, secondList[index]]);
  }

  allPositionDiffs() {
    const upSideDiffs = this.zip(new Array(8).fill(0), this.positiveIndexDiffs);
    const downSideDiffs = this.zip(
      new Array(8).fill(0),
      this.negativeIndexDiffs
    );
    const rightSideDiffs = this.zip(
      this.positiveIndexDiffs,
      new Array(8).fill(0)
    );
    const leftSideDiffs = this.zip(
      this.negativeIndexDiffs,
      new Array(8).fill(0)
    );
    return {
      upSideDiffs,
      leftSideDiffs,
      downSideDiffs,
      rightSideDiffs
    };
  }

  placeMove(diff) {
    return [this.position[0] + diff[0], this.position[1] + diff[1]];
  }

  allPossibleMoves() {
    const {
      upSideDiffs,
      leftSideDiffs,
      downSideDiffs,
      rightSideDiffs
    } = this.allPositionDiffs();
    const upSideMoves = upSideDiffs.map(this.placeMove, this);
    const leftSideMoves = leftSideDiffs.map(this.placeMove, this);
    const downSideMoves = downSideDiffs.map(this.placeMove, this);
    const rightSideMoves = rightSideDiffs.map(this.placeMove, this);
    return {
      upSideMoves,
      leftSideMoves,
      downSideMoves,
      rightSideMoves
    };
  }

  filterMoves(move) {
    return move.every(index => index >= 0 && index < 8);
  }

  possibleMovesInBoard() {
    const {
      upSideMoves,
      leftSideMoves,
      downSideMoves,
      rightSideMoves
    } = this.allPossibleMoves();
    const validUpSideMoves = upSideMoves.filter(this.filterMoves);
    const validLeftSideMoves = leftSideMoves.filter(this.filterMoves);
    const validDownSideMoves = downSideMoves.filter(this.filterMoves);
    const validRightSideMoves = rightSideMoves.filter(this.filterMoves);
    return {
      validUpSideMoves,
      validLeftSideMoves,
      validDownSideMoves,
      validRightSideMoves
    };
  }

  isPlaceEmpty(move) {
    return this.board[move[0]][move[1]] == " ";
  }

  isSibling(move) {
    return this.family.includes(this.board[move[0]][move[1]]);
  }

  getValidMoves(moves) {
    let validMoves = [];
    for (let index = 0; index < moves.length; index++) {
      let move = moves[index];
      if (!this.isPlaceEmpty(move) && !this.isSibling(move)) {
        validMoves.push(move);
        return validMoves;
      }
      if (!this.isPlaceEmpty(move) && this.isSibling(move)) return validMoves;
      validMoves.push(move);
    }
    return validMoves;
  }

  allValidPossibleMoves() {
    const allMoves = this.possibleMovesInBoard();
    return Object.keys(allMoves).reduce((list, moves) => {
      return this.getValidMoves(allMoves[moves]).concat(list);
    }, []);
  }
}

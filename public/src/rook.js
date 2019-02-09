class Rook {
  constructor(position, family) {
    this.position = position;
    this.positiveIndexDiffs = [1, 2, 3, 4, 5, 6, 7];
    this.negativeIndexDiffs = [-1, -2, -3, -4, -5, -6, -7];
    this.family = family;
  }

  getPosition() {
    return this.position;
  }

  setPosition(x, y) {
    this.position = new Position(x, y);
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
    return new Position(
      this.position.getX() + diff[0],
      this.position.getY() + diff[1]
    );
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

  isMoveInTheBound(move) {
    return move >= 0 && move < 8;
  }

  filterMoves(move) {
    return this.isMoveInTheBound(move.getX()) && this.isMoveInTheBound(move.getY());
  }

  possibleMovesInBoard() {
    const {
      upSideMoves,
      leftSideMoves,
      downSideMoves,
      rightSideMoves
    } = this.allPossibleMoves();
    const validUpSideMoves = upSideMoves.filter(this.filterMoves,this);
    const validLeftSideMoves = leftSideMoves.filter(this.filterMoves,this);
    const validDownSideMoves = downSideMoves.filter(this.filterMoves,this);
    const validRightSideMoves = rightSideMoves.filter(this.filterMoves,this);
    return {
      validUpSideMoves,
      validLeftSideMoves,
      validDownSideMoves,
      validRightSideMoves
    };
  }

  isPlaceEmpty(board, move) {
    return board[move.getX()][move.getY()] == " ";
  }

  isSibling(board, move) {
    return this.family.includes(board[move.getX()][move.getY()]);
  }

  getValidMoves(board, moves) {
    let validMoves = [];
    for (let index = 0; index < moves.length; index++) {
      let move = moves[index];
      let isPlaceOccupied = !this.isPlaceEmpty(board, move);
      let belongsToOwnArmy = this.isSibling(board, move);
      if (isPlaceOccupied && !belongsToOwnArmy) {
        validMoves.push(move);
        return validMoves;
      }
      if (isPlaceOccupied && belongsToOwnArmy) return validMoves;
      validMoves.push(move);
    }
    return validMoves;
  }

  validMovesByDirection(board) {
		const allMoves = this.possibleMovesInBoard();
		return Object.keys(allMoves).reduce((list, direction) => {
			list[direction] = this.getValidMoves(board, allMoves[direction]);
			return list;
		}, {});
	}

	allValidPossibleMoves(board) {
		const moves = this.validMovesByDirection(board);
		return Object.keys(moves).reduce((list, direction) => {
      return list.concat(moves[direction]);
		}, []);
	}
}

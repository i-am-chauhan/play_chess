class Bishop {
  constructor(position, family) {
    this.position = position;
    this.family = family;
    this.positiveIndexDiffs = [1, 2, 3, 4, 5, 6, 7];
    this.negativeIndexDiffs = [-1, -2, -3, -4, -5, -6, -7];
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
    const upRightDiffs = this.zip(
      this.positiveIndexDiffs,
      this.positiveIndexDiffs
    );
    const upLeftDiffs = this.zip(
      this.negativeIndexDiffs,
      this.positiveIndexDiffs
    );
    const bottomRightDiffs = this.zip(
      this.positiveIndexDiffs,
      this.negativeIndexDiffs
    );
    const bottomLeftDiffs = this.zip(
      this.negativeIndexDiffs,
      this.negativeIndexDiffs
    );
    return { upRightDiffs, upLeftDiffs, bottomRightDiffs, bottomLeftDiffs };
  }

  placeMove(diff) {
    return new Position(
      this.position.getX() + diff[0],
      this.position.getY() + diff[1]
    );
  }

  allPossibleMoves() {
    const allMoveDiffs = this.allPositionDiffs();
    const upRightMoves = allMoveDiffs.upRightDiffs.map(this.placeMove, this);
    const upLeftMoves = allMoveDiffs.upLeftDiffs.map(this.placeMove, this);
    const bottomRightMoves = allMoveDiffs.bottomRightDiffs.map(
      this.placeMove,
      this
    );
    const bottomLeftMoves = allMoveDiffs.bottomLeftDiffs.map(
      this.placeMove,
      this
    );
    return { upRightMoves, upLeftMoves, bottomRightMoves, bottomLeftMoves };
  }

  isMoveInTheBound(move) {
    return move >= 0 && move < 8;
  }

  filterMoves(move) {
    return this.isMoveInTheBound(move.getX()) && this.isMoveInTheBound(move.getY());
  }


  possibleMovesInBoard() {
    const possibleMoves = this.allPossibleMoves();
    const validUpRightMoves = possibleMoves.upRightMoves.filter(
      this.filterMoves,this
    );
    const validUpLeftMoves = possibleMoves.upLeftMoves.filter(this.filterMoves,this);
    const validBottomRightMoves = possibleMoves.bottomRightMoves.filter(
      this.filterMoves,this
    );
    const validBottomLeftMoves = possibleMoves.bottomLeftMoves.filter(
      this.filterMoves,this
    );
    return {
      validUpRightMoves,
      validUpLeftMoves,
      validBottomRightMoves,
      validBottomLeftMoves
    };
  }

  isPlaceEmpty(board, move) {
    return board[move.getX()][move.getY()] == " ";
  }

  isSibling(board, move) {
    return this.family.includes(board[move.getX()][move.getY()]);
  }

  getValidMoves(board, moves) {
    const validMoves = [];
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

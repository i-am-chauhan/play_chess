class Knight {
	constructor(position, family) {
		this.position = position;
		this.family = family;
	}

	getPosition() {
		return this.position;
	}

	setPosition(x, y) {
		this.position = new Position(x, y);
	}

	getAllCombinations(firstList, secondList) {
		return firstList.reduce(function(allCombinations, element) {
			return allCombinations.concat(secondList.map((x) => [element, x]));
		}, []);
	}

	allPositionDiffs() {
		const moveDifference = this.getAllCombinations(
			[1, -1, 2, -2],
			[1, -1, 2, -2]
		);
		return moveDifference
			.filter((x) => Math.abs(x[0]) != Math.abs(x[1]))
			.sort();
	}

	placeMove(diff) {
		return new Position(
			this.position.getX() + diff[0],
			this.position.getY() + diff[1]
		);
	}

	allPossibleMoves() {
		return this.allPositionDiffs().map(this.placeMove, this);
	}

	isMoveInTheBound(move) {
		return move >= 0 && move < 8;
	}

	filterMoves(move) {
		return (
			this.isMoveInTheBound(move.getX()) && this.isMoveInTheBound(move.getY())
		);
	}

	possibleMovesInBoard() {
		const allMoves = this.allPossibleMoves().filter(this.filterMoves, this);
		return { allMoves };
	}

	isMoveValid(board, position) {
		let pieceOnPlace = board[position.getX()][position.getY()];
		return !this.family.includes(pieceOnPlace);
	}

	allValidPossibleMoves(board) {
		const { allMoves } = this.possibleMovesInBoard();
		return allMoves.filter(this.isMoveValid.bind(this, board));
	}

	validMovesByDirection(board) {
		const { allMoves } = this.possibleMovesInBoard();
		const moves = allMoves.filter(this.isMoveValid.bind(this, board));
		return { allMoves: moves };
	}
}

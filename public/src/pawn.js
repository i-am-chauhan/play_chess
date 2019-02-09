class Pawn {
	constructor(position, family, team) {
		this.position = position;
		this.team = team;
		this.difference = {};
		this.difference.black = [[1, 0], [1, 1], [1, -1]];
		this.difference.white = [[-1, 0], [-1, -1], [-1, 1]];
		this.family = family;
	}

	getPosition() {
		return this.position;
	}

	setPosition(x, y) {
		this.position = new Position(x, y);
	}

	placeMove(diff) {
		return new Position(
			this.position.getX() + diff[0],
			this.position.getY() + diff[1]
		);
	}

	allPossibleMoves() {
		const diffs = this.difference[this.team];
		const runningPossibles = diffs.slice(0, 1).map(this.placeMove, this);
		const killingPossibles = diffs.slice(1).map(this.placeMove, this);
		return { runningPossibles, killingPossibles };
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
		const { runningPossibles, killingPossibles } = this.allPossibleMoves();
		const runningMoves = runningPossibles.filter(this.filterMoves, this);
		const killingMoves = killingPossibles.filter(this.filterMoves, this);
		return { runningMoves, killingMoves };
	}

	isMoveValid(board, position) {
		let possibleBarriers = this.family.concat(" ");
		let pieceOnPlace = board[position.getX()][position.getY()];
		return !possibleBarriers.includes(pieceOnPlace);
	}

	allValidPossibleMoves(board) {
		const { runningMoves, killingMoves } = this.possibleMovesInBoard();
		const straightMove = runningMoves.filter(
			(move) => board[move.getX()][move.getY()] == " "
		);
		const diagonalMoves = killingMoves.filter(
			this.isMoveValid.bind(this, board)
		);
		return straightMove.concat(diagonalMoves);
	}

	validMovesByDirection(board) {
		const { runningMoves, killingMoves } = this.possibleMovesInBoard();
		const straightMove = runningMoves.filter(
			(move) => board[move.getX()][move.getY()] == " "
		);
		const diagonalMoves = killingMoves.filter(
			this.isMoveValid.bind(this, board)
		);
		return { runningMoves: straightMove, killingMoves: diagonalMoves };
	}
}

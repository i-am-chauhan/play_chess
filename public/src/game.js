class Position {
	constructor(x, y) {
		this.X = x;
		this.Y = y;
	}

	getX() {
		return this.X;
	}

	getY() {
		return this.Y;
	}

	changeXBy(count) {
		this.X += count;
	}

	changeYBy(count) {
		this.Y += count;
	}
}

class Army {
	constructor(soldiers, name) {
		this.soldiers = soldiers;
		this.name = name;
		this.deadSoldiers = {};
	}

	removeSoldier(symbol) {
		delete this.soldiers[symbol];
	}

	addDeadSoldier(symbol) {
		this.deadSoldiers[symbol] = this.soldiers[symbol];
	}
}

class Game {
	constructor(firstArmy, secondArmy, board) {
		this.firstArmy = firstArmy;
		this.secondArmy = secondArmy;
		this.board = board;
		this.armies = [this.firstArmy, this.secondArmy];
		this.currentIndex = 0;
		this.currentArmy = this.armies[this.currentIndex];
		this.kings = ["K", "k"];
		this.currSoldier = "";
	}

	toggleCurrArmy() {
		this.currentIndex = 1 - this.currentIndex;
		this.currentArmy = this.armies[this.currentIndex];
	}

	setCurrentSoldier(position) {
		this.currSoldier = this.board[position.X][position.Y];
	}

	getCurrSoldierMoves() {
		return this.currentArmy.soldiers[this.currSoldier].allValidPossibleMoves(
			this.board
		);
	}

	getCurrSoldierPosition() {
		return this.currentArmy.soldiers[this.currSoldier].getPosition();
	}

	getEnemyKing() {
		return this.armies[1 - this.currentIndex].soldiers[
			this.kings[1 - this.currentIndex]
		];
	}

	isCheck() {
		const allPossibleMoves = this.getCurrSoldierMoves();
		return allPossibleMoves.some((position) => {
			return (
				this.board[position.X][position.Y] == this.kings[1 - this.currentIndex]
			);
		});
	}

	isMoveAtPosition(position, move) {
		return move.X == position.X && move.Y == position.Y;
	}

	isSoldierCanGoTo(soldiers, position, soldier) {
		const board = this.board.slice();
		const currSoldierPosition = this.getCurrSoldierPosition();
		board[currSoldierPosition.X][currSoldierPosition.Y] = " ";
		return soldiers[soldier]
			.allValidPossibleMoves(board)
			.some(this.isMoveAtPosition.bind(null, position));
	}

	isPlaceSafe(position) {
		const currSoldiers = this.currentArmy.soldiers;
		return !Object.keys(currSoldiers).some(
			this.isSoldierCanGoTo.bind(this, currSoldiers, position)
		);
	}

	isEnemyKingHasASafeMove() {
		const enemyKing = this.getEnemyKing();
		return enemyKing
			.allValidPossibleMoves(this.board)
			.some(this.isPlaceSafe, this);
	}

	getEnemyKingSoldiers(allSoldiers) {
		return Object.keys(allSoldiers).filter(
			(soldier) => !this.kings.includes(soldier)
		);
	}

	getCheckMoveDirectionMoves() {
		const moves = this.currentArmy.soldiers[
			this.currSoldier
		].validMovesByDirection(this.board);
		const enemyKing = this.getEnemyKing();
		return Object.keys(moves).filter((direction) => {
			return moves[direction].some(
				this.isMoveAtPosition.bind(null, enemyKing.getPosition())
			);
		});
	}

	isKingCanBeRescuedFrom() {
		const allRescuableMoves = this.getCheckMoveDirectionMoves().concat(
			this.getCurrSoldierPosition()
		);
		const enemyArmySoldiers = this.armies[1 - this.currentIndex].soldiers;
		const rescueSoldiers = this.getEnemyKingSoldiers(enemyArmySoldiers);
		return rescueSoldiers.some((soldier) => {
			let soldierMoves = enemyArmySoldiers[soldier].allValidPossibleMoves(
				this.board
			);
			return soldierMoves.some((move) => {
				return allRescuableMoves.some(this.isMoveAtPosition.bind(null, move));
			});
		});
	}

	isNotCheckAndMate() {
		return this.isEnemyKingHasASafeMove() || this.isKingCanBeRescuedFrom();
	}

	isSoldierValid() {
		return Object.keys(this.currentArmy.soldiers).includes(this.currSoldier);
	}

	isMoveValid(move) {
		return this.getCurrSoldierMoves().some(
			this.isMoveAtPosition.bind(null, move)
		);
	}

	placeMove(move) {
		const currSoldierPosition = this.getCurrSoldierPosition();
		const targetSymbol = this.board[move.X][move.Y];
		const enemyArmy = this.armies[1 - this.currentIndex];
		const targetSoldier = enemyArmy.soldiers[targetSymbol];
		if (targetSoldier) {
			enemyArmy.addDeadSoldier(targetSymbol);
			enemyArmy.removeSoldier(targetSymbol);
		}
		this.currentArmy.soldiers[this.currSoldier].setPosition(move.X, move.Y);
		this.board[move.X][move.Y] = this.currSoldier;
		this.board[currSoldierPosition.X][currSoldierPosition.Y] = " ";
	}
}

Snake = function(board)
{
	this.board = board;
	this.bodyLength = 0;
	this.head = Position();
	this.direction = "right";
}

Snake.prototype.put = function() {
	this.board.setField(new Position(0, 0), SnakeField);
	this.board.setField(new Position(0, 1), SnakeField);
	this.board.setField(new Position(0, 2), SnakeField);
};

Snake.prototype.move = function() {
	var newPosition = new Position(this.head.row, this.head.col);
	switch (this.direction) {
		case "left":
			--newPosition.col;
			break;
		case "right":
			++newPosition.col;
			break;
		case "up":
			--newPosition.row;
			break;
		case "down":
			++newPosition.row;
			break;
	}
	if (this.isGoodMove(newPosition)) {
		var isApple = this.isApple(newPosition);
		this.board.setField(newPosition, SnakeField);
		if (!isApple)
			this.decrement();
		else
			this.eat();
		this.board.draw();
	} else {
		console.warn("Ruch niedozwolony!");
	}
};

Snake.prototype.changeDirection = function(direction) {
	if (
		!(this.direction == "left" && direction == "right") &&
		!(this.direction == "right" && direction == "left") &&
		!(this.direction == "up" && direction == "down") &&
		!(this.direction == "down" && direction == "up") &&
		!(this.direction == "left" && direction == "left") &&
		!(this.direction == "right" && direction == "right") &&
		!(this.direction == "up" && direction == "up") &&
		!(this.direction == "down" && direction == "down")
	)
	this.direction = direction;
};

Snake.prototype.isGoodMove = function(position) {
	if (this.board.getField(position) === undefined)
		return false;
	else if (this.board.getField(position) instanceof SnakeField)
		return false;
	else
		return true;
};

Snake.prototype.isApple = function(position) {
	return this.board.getField(position) instanceof AppleField;
};

Snake.prototype.eat = function() {
	this.board.putApple();
};

Snake.prototype.decrement = function() {
	this.board.foreach(function(field, board) {
		if (field instanceof SnakeField)
		{
			--field.part;
			if (field.part == 0)
				board.setField(field.position, EmptyField);
		}
	});
	--this.bodyLength;
};
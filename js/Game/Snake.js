function Snake(board) {
    this.bodyLength = 0;
    this.direction = "right";
	this.board = board;
    this.board.setField({
        col: 0,
        row: 0
    }, SnakeField, undefined, ++this.bodyLength);
    this.board.setField({
        col: 1,
        row: 0
    }, SnakeField, undefined, ++this.bodyLength);
    this.board.setField({
        col: 2,
        row: 0
    }, SnakeField, undefined, ++this.bodyLength);
    this.head = {
        col: 2,
        row: 0
    };
}

Snake.prototype.move = function() {
	var newPosition = {
        col: this.head.col,
        row: this.head.row
    };
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
		this.board.setField(newPosition, SnakeField, undefined, ++this.bodyLength);
		if (!isApple)
			this.crawl();
		else
			this.eat();
		this.board.draw();
        this.head = newPosition;
	} else
		console.warn("Ruch niedozwolony!");
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
	return !(this.board.getField(position) instanceof SnakeField);
};

Snake.prototype.isApple = function(position) {
	return this.board.getField(position) instanceof AppleField;
};

Snake.prototype.eat = function() {
	this.board.putApple();
};

Snake.prototype.crawl = function() {
	this.board.foreach(function(field, board) {
		if (field instanceof SnakeField) {
			--field.part;
			if (field.part == 0)
				board.setField(field.position, EmptyField);
		}
	});
	--this.bodyLength;
};
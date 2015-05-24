function Snake(board) {
    this.bodyLength = 0;
    this.directions = [
        "right",
        "right"
    ];
    this.newDirection = "right";
	this.board = board;
    this.board.setField({
        col: 0,
        row: 0
    }, SnakeField, "right", "tail", ++this.bodyLength);
    this.board.setField({
        col: 1,
        row: 0
    }, SnakeField, "right", "body", ++this.bodyLength);
    this.board.setField({
        col: 2,
        row: 0
    }, SnakeField, "right", "head", ++this.bodyLength);
    this.head = [
        {
            col: 1,
            row: 0
        }, {
            col: 2,
            row: 0
        }
    ];
}

Snake.prototype.move = function() {
    this.board.getField(this.head[1]).id = 1;
    this.refreshDirection();
	var newPosition = {
        col: this.head[1].col,
        row: this.head[1].row
    };
	switch (this.directions[1]) {
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
		this.board.setField(newPosition, SnakeField, this.directions[1], "head", ++this.bodyLength);
        this.makeCorner();
		if (!isApple)
			this.crawl();
		else
			this.eat();
		this.board.draw();
        this.head.shift();
        this.head[1] = newPosition;
	} else
		console.warn("Ruch niedozwolony!");
};

Snake.prototype.setDirection = function(direction) {
	this.newDirection = direction;
};

Snake.prototype.refreshDirection = function() {
    this.directions.shift();
    if (
        (this.newDirection == "left" && this.directions[0] == "up") ||
        (this.newDirection == "up" && this.directions[0] == "left") ||
        (this.newDirection == "right" && this.directions[0] == "up") ||
        (this.newDirection == "up" && this.directions[0] == "right") ||
        (this.newDirection == "right" && this.directions[0] == "down") ||
        (this.newDirection == "down" && this.directions[0] == "right") ||
        (this.newDirection == "left" && this.directions[0] == "down") ||
        (this.newDirection == "down" && this.directions[0] == "left")
    )
        this.directions[1] = this.newDirection;
    else
        this.directions[1] = this.directions[0];
};

Snake.prototype.makeCorner = function() {
    if (this.directions[0] != this.directions[1]) {
        this.board.getField(this.head[1]).orientation = this.directions[0] + "-" + this.directions[1];
    }
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
    this.board.getField(this.head[1]).spriteType = "body";
	this.board.putApple();
};

Snake.prototype.crawl = function() {
    --this.bodyLength;
	this.board.foreach(this, function(field) {
		if (field instanceof SnakeField) {
			--field.part;
            if (field.part == 0)
                this.board.setField(field.position, EmptyField);
            else if (field.part == 1)
                field.spriteType = "tail";
            else if (field.part < this.bodyLength)
                field.spriteType = "body";
		}
	});
};
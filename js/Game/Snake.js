Snake = function(board)
{
	this.board = board;
	this.bodyLength = 0;
	this.head = Position();
}

Snake.prototype.put = function() {
	this.board.setField(new Position(0, 0), SnakeField);
	this.board.setField(new Position(0, 1), SnakeField);
	this.board.setField(new Position(0, 2), SnakeField);
};

Snake.prototype.move = function(direction) {
	var newPosition = new Position(this.head.row, this.head.col);
	switch (direction)
	{
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
	this.board.setField(newPosition, SnakeField);
	this.board.foreach(function(field, board) {
		if (field instanceof SnakeField)
		{
			--field.part;
			if (field.part == 0)
				board.setField(field.position, EmptyField);
		}
	});
	--this.bodyLength;
	this.board.draw();
};
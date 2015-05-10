Snake = function(board)
{
	this.board = board;
	this.bodyLength = Number(0);
	this.head = Position();
	this.board.setField(new Position(0, 0), SnakeField);
	this.board.setField(new Position(0, 1), SnakeField);
	this.board.setField(new Position(0, 2), SnakeField);
}

Snake.prototype.move = function(direction) {
	switch (direction)
	{
		case "left":
			--this.head.col;
			break;
		case "right":
			++this.head.col;
			break;
		case "up":
			--this.head.row;
			break;
		case "down":
			++this.head.row;
			break;
	}
	this.board.setField(head, SnakeField);
	this.board.foreach(function(field, board) {
		if (field instanceof SnakeField)
		{
			--field.part;
			if (field.part == 0)
				board.setField(field.position, EmptyField);
		}
	});
	--SnakeField.bodyLength;
	this.draw();
};
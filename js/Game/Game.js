/**
* Konstruktor gry:
* - tworzy element canvas
* - oblicza szerokość pól na postawie szerokości i wysokości elementu canvas
* - inicjuje pola (board)
* - kładzie węża
* - kładzie jabłko na planszy
* - pierwsze malowanie planszy
*/
Game = function(canvasID, size) {
	// tworzy element canvas
	var canvas = document.getElementById(canvasID);
	var context = null;
	if (canvas.getContext)
		context = canvas.getContext('2d');
	else {
		console.error("Nie można było zainicjować elementu canvas.");
		return;
	}
	// oblicza szerokość pól na postawie szerokości i wysokości elementu canvas
	var scale = canvas.width / size.col;
	// inicjuje pola (board)
	this.board = new Board(context, size, scale);
	// kładzie węża
	this.board.setField(new Position(0, 0), SnakeField);
	this.board.setField(new Position(0, 1), SnakeField);
	this.board.setField(new Position(0, 2), SnakeField);
	// kładzie jabłko na planszy
	this.placeApple();
	// pierwsze malowanie planszy
	this.draw();
};

Game.prototype.move = function(direction) {
	var head = new Position(SnakeField.head.row, SnakeField.head.col);
	switch (direction)
	{
		case "left":
			--head.col;
			break;
		case "right":
			++head.col;
			break;
		case "up":
			--head.row;
			break;
		case "down":
			++head.row;
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

/**
* Metoda maluje naszą planszę na elemencie canvas
*/
Game.prototype.draw = function() {
	this.board.foreach(function(field) {
		field.draw();
	});
};
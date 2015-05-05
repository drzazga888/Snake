/**
* Konstruktor gry:
* - tworzy element canvas
* - oblicza szerokość pól na postawie szerokości i wysokości elementu canvas
* - inicjuje pola (size, board)
* - kładzie węża
* - kładzie jabłko na planszy
* - pierwsze malowanie planszy
*/
Game = function(canvasID, size) {
	// tworzy element canvas
	var canvas = document.getElementById(canvasID);
	if (canvas.getContext)
		this.context = canvas.getContext('2d');
	else {
		console.error("Nie można było zainicjować elementu canvas.");
		return;
	}
	// oblicza szerokość pól na postawie szerokości i wysokości elementu canvas
	this.scale = canvas.width / size.col;
	// inicjuje pola (size, board)
	this.size = size;
	this.board = new Board(this.context, size, this.scale);
	// kładzie węża
	this.board.setField(new Position(0, 0), SnakeField);
	this.board.setField(new Position(0, 1), SnakeField);
	this.board.setField(new Position(0, 2), SnakeField);
	// kładzie jabłko na planszy
	this.placeApple();
	// pierwsze malowanie planszy
	this.draw();
};

/**
* Kładzie jabłko na planszy (losowanie pozycji aż będzie pusta - EmptyField)
*/
Game.prototype.placeApple = function() {
	var position = new Position();
	do {
		position.row = Math.floor(Math.random() * this.size.row);
		position.col = Math.floor(Math.random() * this.size.col);
		
	} while (!(this.board.getField(position) instanceof EmptyField));
	this.board.setField(position, AppleField);
};

Game.prototype.move = function(direction) {
	var head = SnakeField.head;
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
	this.board.foreach(function(field) {
		if (field instanceof SnakeField)
		{
			--field.part;
			if (field.part == 0)
			{
				var context = field.context;
				var position = field.position;
				var scale = field.scale;
				field = new EmptyField(context, position, scale);
			}
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
Board = function(context, size, scale) {
	this.context = context;
	this.size = size;
	this.scale = new Number(scale);
	this.fields = [];
	for (var row_i = 0; row_i < this.size.row; row_i++) {
		this.fields[row_i] = [];
		for (var col_i = 0; col_i < this.size.col; col_i++) {
			this.setField(new Position(row_i, col_i), EmptyField);
		};
	};
}

Board.prototype.registerSnake = function(snake) {
	this.snake = snake;
};

Board.prototype.setField = function(position, fieldType, spriteType) {
	if (fieldType === SnakeField)
		this.fields[position.row][position.col] = new fieldType(this.context, position, this.scale, this.snake, spriteType);
	else
		this.fields[position.row][position.col] = new fieldType(this.context, position, this.scale);
};

Board.prototype.getField = function(position) {
	if (this.fields[position.row] !== undefined)
		return this.fields[position.row][position.col];
	else
		return undefined;
};

Board.prototype.foreach = function(callback) {
	for (var row_i = 0; row_i < this.size.row; row_i++) {
		for (var col_i = 0; col_i < this.size.col; col_i++)
			callback(this.getField(new Position(row_i, col_i)), this);
	};
};

Board.prototype.draw = function() {
	this.foreach(function(field) {
		field.draw();
	});
};

Board.prototype.putApple = function() {
	var position = new Position();
	do {
		position.row = Math.floor(Math.random() * this.size.row);
		position.col = Math.floor(Math.random() * this.size.col);
	} while (!(this.getField(position) instanceof EmptyField));
	this.setField(position, AppleField);
};
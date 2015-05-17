function Board(params) {
	this.ctx = params.ctx;
    this.size = params.size;
	this.fieldSize = params.fieldSize;
	this.fields = [];
	for (var row_i = 0; row_i < this.size.rows; ++row_i) {
		this.fields[row_i] = [];
		for (var col_i = 0; col_i < this.size.cols; ++col_i)
			this.setField({
                row: row_i,
                col: col_i
            }, EmptyField);
	}
}

Board.prototype.setField = function(position, fieldType, spriteType, part) {
    this.fields[position.row][position.col] = new fieldType(this, position, spriteType, part);
};

Board.prototype.getField = function(position) {
	if (this.fields[position.row] !== undefined)
		return this.fields[position.row][position.col];
	else
		return undefined;
};

Board.prototype.foreach = function(callback) {
	for (var row_i = 0; row_i < this.size.rows; row_i++) {
		for (var col_i = 0; col_i < this.size.cols; col_i++)
            callback(this.getField({
                col: col_i,
                row: row_i
            }), this);
	}
};

Board.prototype.draw = function() {
	this.foreach(function(field) {
		field.draw();
	});
};

Board.prototype.putApple = function() {
	var position = {};
	do {
		position.row = Math.floor(Math.random() * this.size.rows);
		position.col = Math.floor(Math.random() * this.size.cols);
	} while (!(this.getField(position) instanceof EmptyField));
	this.setField(position, AppleField);
};
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

Board.prototype.setField = function(position, fieldType) {
	this.fields[position.row][position.col] = new fieldType(this.context, position, this.scale);
};

Board.prototype.getField = function(position) {
	return this.fields[position.row][position.col];
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
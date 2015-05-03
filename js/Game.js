function Game(size) {
	this.size = size;
	this.board = [];
	for (var row_i = 0; row_i < params.rows; row_i++) {
		this.board[row_i] = [];
		for (var col_i = 0; col_i < params.cols; col_i++) {
			this.board[row_i][col_i] = new EmptyField();
		};
	};
	this.randSeekPush(1, 2);
	this.draw();
}

Game.prototype.draw = function() {
	for (var row_i = 0; row_i < this.size.rows; row_i++) {
		var toPrint = "";
		for (var col_i = 0; col_i < this.size.cols; col_i++)
			toPrint += this.board[row_i][col_i].draw() + " ";
		console.log(toPrint);
	};
};

Game.prototype.randSeekPush = function(desiredField, newField) {
	
};
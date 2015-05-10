Apple = function(board)
{
	this.board = board;
	this.position = new Position();
	this.put();
}

/**
* Kładzie jabłko na planszy (losowanie pozycji aż będzie pusta - EmptyField)
*/
Apple.prototype.put = function() {
	do {
		this.position.row = Math.floor(Math.random() * this.board.size.row);
		this.position.col = Math.floor(Math.random() * this.board.size.col);
	} while (!(this.board.getField(position) instanceof EmptyField));
	this.board.setField(position, AppleField);
};
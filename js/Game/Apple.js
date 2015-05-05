Apple = function()
{

}

/**
* Kładzie jabłko na planszy (losowanie pozycji aż będzie pusta - EmptyField)
*/
Game.prototype.placeApple = function() {
	var position = new Position();
	do {
		position.row = Math.floor(Math.random() * this.board.size.row);
		position.col = Math.floor(Math.random() * this.board.size.col);
		
	} while (!(this.board.getField(position) instanceof EmptyField));
	this.board.setField(position, AppleField);
};
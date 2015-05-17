function AppleField(board, position) {
	Field.call(this, board, position);
}

AppleField.prototype = Object.create(Field.prototype);
AppleField.prototype.constructor = AppleField;

AppleField.prototype.draw = function() {
	this.board.ctx.fillStyle = "#f00";
	Field.prototype.draw.call(this);
};
function EmptyField(board, position) {
	Field.call(this, board, position);
}

EmptyField.prototype = Object.create(Field.prototype);
EmptyField.prototype.constructor = EmptyField;

EmptyField.prototype.draw = function() {
	this.board.ctx.fillStyle = "#fff";
	Field.prototype.draw.call(this);
};
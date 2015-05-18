function EmptyField(board, position) {
	Field.call(this, board, position);
}

EmptyField.prototype = Object.create(Field.prototype);
EmptyField.prototype.constructor = EmptyField;

EmptyField.prototype.draw = function() {
    Field.prototype.draw.call(this);
};
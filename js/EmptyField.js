function EmptyField() {
	Field.call(this);
}

EmptyField.prototype = Object.create(Field.prototype);
EmptyField.prototype.constructor = EmptyField;

EmptyField.prototype.draw = function() {
	return "-";
};
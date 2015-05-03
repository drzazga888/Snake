function AppleField() {
	Field.call(this);
}

AppleField.prototype = Object.create(Field.prototype);
AppleField.prototype.constructor = AppleField;

AppleField.prototype.draw = function() {
	return "O";
};
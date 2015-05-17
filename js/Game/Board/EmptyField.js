EmptyField = function(context, position, scale) {
	Field.call(this, context, position, scale);
};

EmptyField.prototype = Object.create(Field.prototype);
EmptyField.prototype.constructor = EmptyField;

EmptyField.prototype.draw = function() {
	this.context.fillStyle = "#fff";
	Field.prototype.draw.call(this);
};
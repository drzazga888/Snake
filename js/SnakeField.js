SnakeField = function(context, position, scale) {
	Field.call(this, context, position, scale);
	this.part = ++SnakeField.bodyLength;
	SnakeField.head = position;
};

SnakeField.prototype = Object.create(Field.prototype);
SnakeField.prototype.constructor = AppleField;

SnakeField.bodyLength = 0;
SnakeField.head = Position();

SnakeField.prototype.draw = function() {
	this.context.fillStyle = this.getColorFromPart();
	this.drawRect();
};

SnakeField.prototype.getColorFromPart = function() {
	var percantPart = Math.atan(this.part) * (200 / Math.PI);
	return "rgb(0%, " + percantPart + "%, 100%)";
};
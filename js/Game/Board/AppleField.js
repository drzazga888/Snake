AppleField = function(context, position, scale) {
	Field.call(this, context, position, scale);
};

AppleField.prototype = Object.create(Field.prototype);
AppleField.prototype.constructor = AppleField;

AppleField.prototype.draw = function() {
	this.context.fillStyle = "#f00";
	this.drawRect();
};
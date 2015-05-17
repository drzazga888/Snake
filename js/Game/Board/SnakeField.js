SnakeField = function(context, position, scale, snake, spriteType) {
	Field.call(this, context, position, scale);
	this.part = ++snake.bodyLength;
	snake.head = position;
	this.spriteType = spriteType;
};

SnakeField.prototype = Object.create(Field.prototype);
SnakeField.prototype.constructor = SnakeField;

SnakeField.prototype.draw = function() {
	this.context.fillStyle = "#0f0";
	Field.prototype.draw.call(this);
	this.context.font = "20px sans-serif";
	this.context.fillStyle = "#000";
	this.context.fillText(this.part, this.position.col * this.scale + 20, this.position.row * this.scale + 20);
};
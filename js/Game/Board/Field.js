Field = function(context, position, scale) {
	this.context = context;
	this.position = position;
	this.scale = new Number(scale);
};

Field.prototype.draw = function() {
	this.context.fillRect(this.position.col * this.scale, this.position.row * this.scale, this.scale, this.scale);
};
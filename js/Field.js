Field = function(context, position, scale) {
	this.context = context;
	this.position = position;
	this.scale = scale;
};

Field.prototype.drawRect = function() {
	this.context.fillRect(this.position.col * this.scale, this.position.row * this.scale, this.scale, this.scale);
};
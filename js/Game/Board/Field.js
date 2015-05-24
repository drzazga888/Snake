function Field(ctx, position, id) {
	this.ctx = ctx;
	this.position = position;
    this.id = id;
}

Field.prototype.draw = function(drawingFunction, rotation) {
    this.ctx.clearRect(
        this.position.col * 100,
        this.position.row * 100,
        100,
        100
    );
    if (drawingFunction !== undefined) {
        this.ctx.save();
        this.ctx.translate(this.position.col * 100, this.position.row * 100);
        if (rotation !== undefined) {
            this.ctx.translate(50, 50);
            this.ctx.rotate(rotation);
            this.ctx.translate(-50, -50);
        }
        drawingFunction.call(this);
        this.ctx.restore();
    }
};
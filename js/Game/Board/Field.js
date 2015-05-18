function Field(board, position) {
	this.board = board;
	this.position = position;
}

Field.prototype.draw = function(drawingFunction, rotation) {
    this.board.ctx.clearRect(
        this.position.col * 100,
        this.position.row * 100,
        100,
        100
    );
    if (drawingFunction !== undefined) {
        this.board.ctx.save();
        this.board.ctx.translate(this.position.col * 100, this.position.row * 100);
        if (rotation !== undefined) {
            this.board.ctx.translate(50, 50);
            this.board.ctx.rotate(rotation);
            this.board.ctx.translate(-50, -50);
        }
        drawingFunction.call(this);
        this.board.ctx.restore();
    }
};
function Field(board, position) {
	this.board = board;
	this.position = position;
}

Field.prototype.draw = function() {
	this.board.ctx.fillRect(
        this.position.col * this.board.fieldSize.width,
        this.position.row * this.board.fieldSize.height,
        this.board.fieldSize.width,
        this.board.fieldSize.height
    );
};
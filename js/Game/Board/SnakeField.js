function SnakeField(board, position, spriteType, part) {
	Field.call(this, board, position);
    this.spriteType = spriteType;
	this.part = part;
}

SnakeField.prototype = Object.create(Field.prototype);
SnakeField.prototype.constructor = SnakeField;

SnakeField.prototype.draw = function() {
	this.board.ctx.fillStyle = "#0f0";
	Field.prototype.draw.call(this);
    this.board.ctx.font = "20px sans-serif";
    this.board.ctx.fillStyle = "#000";
    this.board.ctx.fillText(
        this.part,
        this.position.col * this.board.fieldSize.width + 20,
        this.position.row * this.board.fieldSize.height + 20
    );
};
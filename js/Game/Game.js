function Game(params) {
    var canvas = document.getElementById(params.canvasID);
    this.board = new Board({
        ctx: canvas.getContext('2d'),
        size: params.size,
        fieldSize: {
            width: canvas.width / params.size.cols,
            height: canvas.height / params.size.rows
        }
    });
	this.snake = new Snake(this.board);
	this.board.putApple();
	this.board.draw();
}
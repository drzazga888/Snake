function Game(params) {
    var canvas = document.getElementById(params.canvasID);
    canvas.width = params.size.cols * 100;
    canvas.height = params.size.rows * 100;
    this.board = new Board({
        ctx: canvas.getContext('2d'),
        size: params.size
    });
	this.snake = new Snake(this.board);
	this.board.putApple();
    //this.board.toNumberArray();
	this.board.draw();
}
function Game(params) {
    var canvas = document.getElementById(params.canvasID);
    canvas.width = params.size.cols * 100;
    canvas.height = params.size.rows * 100;
    this.board = new Board( {
        ctx: canvas.getContext('2d'),
        size: params.size
    });
	this.snake = new Snake(this.board);
    this.worker = new Worker("js/Game/Worker.js");
	this.board.putApple();
    // debug only
    this.board.setField( {
        col: 8,
        row: 6
    }, ObstacleField);
    this.board.setField( {
        col: 8,
        row: 7
    }, ObstacleField);
    this.board.setField( {
        col: 4,
        row: 4
    }, PoisonedAppleField);
    this.board.setField( {
        col: 2,
        row: 5
    }, MouseField, "up");
    // end debug
	this.board.draw();
}
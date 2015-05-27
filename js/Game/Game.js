function Game(params) {
    var canvas = document.getElementById(params.canvasID);
    canvas.width = params.size.cols * 100;
    canvas.height = params.size.rows * 100;
    this.board = new Board( {
        ctx: canvas.getContext('2d'),
        size: params.size,
        healthyApples: params.healthyApples,
        maxPoisonedApples: params.maxPoisonedApples,
        obstacles: params.obstacles
    });
    this.interval = params.interval;
	this.snake = new Snake(this.board);
    this.board.putObstacles();
    this.worker = new Worker("js/Game/Worker.js");
    // debug only
    this.board.setField( {
        col: 2,
        row: 5
    }, MouseField, "up");
    // end debug
    // this.calculate();
}

Game.prototype.calculate = function() {
    this.board.draw();
    this.snake.move();
    this.worker.postMessage(this.board.stringify());
};
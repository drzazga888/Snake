function Game(params) {
    this.canvas = $("#" + params.canvasID);
    this.canvas[0].width = params.size.cols * 100;
    this.canvas[0].height = params.size.rows * 100;
    this.board = new Board( {
        ctx: this.canvas[0].getContext('2d'),
        size: params.size,
        obstacles: params.obstacles
    });
    this.interval = params.interval;
	this.snake = new Snake(this.board);
    this.board.putObstacles();
    this.worker = new Worker("js/Game/Worker.js");
    this.worker.postMessage(JSON.stringify( {
        healthyApples: params.healthyApples,
        maxPoisonedApples: params.maxPoisonedApples,
        poisonedApplesChangeProbability: params.poisonedApplesChangeProbability
    }));
    // debug only -----------------------------
    //this.board.setField( {
    //    col: 2,
    //    row: 5
    //}, MouseField, "up");
    // end debug ------------------------------
    this.intervalID = window.setInterval(function() {
        game.calculate();
    }, this.interval);
    this.worker.onmessage = function(event) {
        if (event.data.startsWith("[DEBUG]"))
            console.log(event.data);
        else
            game.board.parse(event.data);
    };
    window.addEventListener("keydown", Game.keydownCallback);
}

Game.keydownCallback = function(event) {
    switch (event.keyCode) {
        case 65:
            game.snake.setDirection('left');
            break;
        case 87:
            game.snake.setDirection('up');
            break;
        case 68:
            game.snake.setDirection('right');
            break;
        case 83:
            game.snake.setDirection('down');
            break;
    }
};

Game.prototype.calculate = function() {
    this.board.draw();
    var movementResult = this.snake.move();
    if (movementResult != null) {
        this.destruct();
        switch (movementResult) {
            case "win":
                this.canvas.css( {
                    backgroundImage: "url(img/game_over.png)"
                });
                break;
            case "loss":
                this.canvas.css( {
                    backgroundImage: "url(img/game_over.png)"
                });
                break;
        }
    }
    this.worker.postMessage(this.board.stringify());
};

Game.prototype.destruct = function() {
    window.clearInterval(this.intervalID);
    this.worker.terminate();
    this.board.ctx.clearRect(0, 0, this.board.size.cols * 100, this.board.size.rows * 100);
    window.removeEventListener("keydown", Game.keydownCallback);
};
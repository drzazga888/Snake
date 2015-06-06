function Game(params) {
    this.handler = params.handler;
    this.canvas = this.handler.find("canvas");
    this.canvas[0].width = params.size.cols * 100;
    this.canvas[0].height = params.size.rows * 100;
    this.board = new Board( {
        ctx: this.canvas[0].getContext('2d'),
        size: params.size,
        obstacles: params.obstacles
    });
    this.interval = params.interval;
    this.maxPointsHandler = this.handler.find(".max-points");
	this.snake = new Snake(this.board, this.handler);
    this.board.putObstacles();
    this.worker = new Worker("js/Game/Worker.js");
    this.worker.postMessage(JSON.stringify( {
        healthyApples: params.healthyApples,
        maxPoisonedApples: params.maxPoisonedApples,
        poisonedApplesChangeProbability: params.poisonedApplesChangeProbability
    }));
    this.paused = true;
    this.changeLayer("game-paused");
    this.worker.onmessage = function(event) {
        game.board.parse(event.data);
    };
    window.addEventListener("keydown", Game.keydownCallback);
}

Game.prototype.pause = function() {
    this.handler.find(".layer-wrapper")[0].removeEventListener("click", Game.clickCallback);
    document.removeEventListener("click", Game.clickedOutsideCallback);
    window.clearInterval(this.intervalID);
    this.paused = true;
    game.changeLayer("game-paused");
};

Game.prototype.play = function() {
    this.intervalID = window.setInterval(function() {
        game.calculate();
    }, this.interval);
    this.paused = false;
    game.changeLayer("game-running");
    this.handler.find(".layer-wrapper")[0].addEventListener("click", Game.clickCallback);
    document.addEventListener("click", Game.clickedOutsideCallback);
};

Game.prototype.changeLayer = function(name) {
    this.handler.find(".layer").hide().filter("." + name).show();
};

Game.keydownCallback = function(event) {
    switch (event.keyCode) {
        case 65: // [a]
            game.snake.setDirection('left');
            break;
        case 87: // [w]
            game.snake.setDirection('up');
            break;
        case 68: // [d]
            game.snake.setDirection('right');
            break;
        case 83: // [s]
            game.snake.setDirection('down');
            break;
        case 80: // [p]
            if (game.paused)
                game.play();
            else
                game.pause();
            break;
    }
};

Game.clickedOutsideCallback = function() {
    game.pause();
};

Game.clickCallback = function(event) {
    event.stopPropagation();
    var borderLeft = game.canvas.css("border-left-width");
    var borderTop = game.canvas.css("border-top-width");
    borderLeft = Number(borderLeft.substring(0, borderLeft.length - 2));
    borderTop = Number(borderTop.substring(0, borderTop.length - 2));
    var x = event.pageX - game.canvas.offset().left - borderLeft;
    var y = event.pageY - game.canvas.offset().top - borderTop;
    var snakeX = (game.snake.head[1].col + 0.5) * game.canvas.width() / game.board.size.cols;
    var snakeY = (game.snake.head[1].row + 0.5) * game.canvas.height() / game.board.size.rows;
    var relX = x - snakeX;
    var relY = y - snakeY;
    var radius = Math.sqrt(relX * relX + relY * relY);
    var angle = Math.acos(relX / radius) * (relY ? relY < 0 ? - 1 : 1 : 0);
    var direction = "";
    if (angle > -Math.PI / 4 && angle <= Math.PI / 4)
        direction = "right";
    else if (angle > Math.PI / 4 && angle <= Math.PI * 3 / 4)
        direction = "down";
    else if (angle > -Math.PI * 3 / 4 && angle <= -Math.PI / 4)
        direction = "up";
    else if (Math.abs(angle) >= Math.PI * 3 / 4 || (relX < 0 && relY == 0))
        direction = "left";
    game.snake.setDirection(direction);
};

Game.prototype.calculate = function() {
    this.board.draw();
    var movementResult = this.snake.move();
    if (movementResult != null) {
        this.destruct();
        switch (movementResult) {
            case "win":
                if (Number(this.maxPointsHandler.eq(0).text()) < this.snake.points)
                    this.maxPointsHandler.text(this.snake.points);
                this.changeLayer("game-win");
                break;
            case "loss":
                if (Number(this.maxPointsHandler.eq(0).text()) < this.snake.points)
                    this.maxPointsHandler.text(this.snake.points);
                this.changeLayer("game-over");
                break;
        }
    }
    this.worker.postMessage(this.board.stringify());
};

Game.prototype.destruct = function() {
    this.pause();
    this.worker.terminate();
    this.board.ctx.clearRect(0, 0, this.board.size.cols * 100, this.board.size.rows * 100);
    window.removeEventListener("keydown", Game.keydownCallback);
};
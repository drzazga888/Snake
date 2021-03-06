/**
 * Główny konstruktor gry
 * @param params - obiekt grupujący parametry:
 *  - handler - uchwyt biblioteki jQuery, wskazuje na element HTML, w którym zawarte jest nasze płótno (canvas) i warstwy (nakładki) na to płótno
 *  - size - rozmiar planszy, obiekt zawierający pola rows (wiersze) i cols (kolumny)
 *  - interval - czas, po którym znowu zostanie odświeżona plansza, parametr dla funkcji window.setInterval
 *  - obstacles - ilość przeszkód
 *  - healthyApples - ilość zdrowych jabłek
 *  - maxPoisonedApples - maksymalna ilość zatrutych jabłek
 *  - poisonedApplesChangeProbability - prawdopodobieństwo tego, że nie zostanie zmieniony stan zatrutych jabłek na planszy po jej odświeżeniu
 * @constructor
 */
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

/**
 * Metoda zatrzymuje grę
 */
Game.prototype.pause = function() {
    this.handler.find(".layer-wrapper")[0].removeEventListener("click", Game.clickCallback);
    document.removeEventListener("click", Game.clickedOutsideCallback);
    window.clearInterval(this.intervalID);
    this.paused = true;
    game.changeLayer("game-paused");
};

/**
 * Metoda wznawia zatrzymaną grę
 */
Game.prototype.play = function() {
    this.intervalID = window.setInterval(function() {
        game.calculate();
    }, this.interval);
    this.paused = false;
    game.changeLayer("game-running");
    this.handler.find(".layer-wrapper")[0].addEventListener("click", Game.clickCallback);
    document.addEventListener("click", Game.clickedOutsideCallback);
};

/**
 * Metoda zmienia aktualną nakładkę na planszę
 * @param name - nazwa nakładki, dostępne:
 *  - "game-running" - nakładka używana, gdy gra nie jest zatrzymana
 *  - "game-over" - nakładka używana, gdy wąż zginie
 *  - "game-win" - nakładka używana, gdy ktoś wygra grę
 *  - "game-paused" - nakłądka używana, gdy ktoś albo uruchomił grę, albo ją zatrzymał
 */
Game.prototype.changeLayer = function(name) {
    this.handler.find(".layer").hide().filter("." + name).show();
};

/**
 * Fukcja, która jest handlerem eventu naciśnięcia klawisza
 * @param event - obiekt zdarzenia javascriptu
 */
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

/**
 * Handler dla zdarzenia naciśnięcia poza planszę
 * @param event - obiekt zdarzenia javascriptu
 */
Game.clickedOutsideCallback = function(event) {
    game.pause();
};

/**
 * Handler dla naciśnięcia przycisku myszy na płótnie
 * @param event - obiekt zdarzenia javascriptu
 */
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

/**
 * Funkcja, która jest parametrem funkcji setInterval, wykonywana jest co jakiś czas dopóki nie zostanie to przerwane; funkcja rysuje planszę, sprawdza czy wygraliśmy bądź przegraliśmy i wysyła dane do WebWorkera
 */
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

/**
 * Funkcja niszczy grę
 */
Game.prototype.destruct = function() {
    this.pause();
    this.worker.terminate();
    this.board.ctx.clearRect(0, 0, this.board.size.cols * 100, this.board.size.rows * 100);
    window.removeEventListener("keydown", Game.keydownCallback);
};
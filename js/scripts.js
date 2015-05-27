if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str){
        return this.slice(-str.length) == str;
    };
}

var game;

$(document).ready(function() {

    $(window).resize(function() {
        var maxWidth = $(this).width();
        var maxHeight = $(this).height();
        $("#game-canvas").css( {
            maxWidth: Math.floor(maxWidth * 0.9) + "px",
            maxHeight: Math.floor(maxHeight * 0.9) + "px"
        });
    }).resize();

    game = new Game( {
        canvasID: "game-canvas",
        size: {
            cols: 16,
            rows: 10
        },
        healthyApples: 2,
        maxPoisonedApples: 3,
        obstacles: 6,
        interval: 280
    });

	window.setInterval(function() {
        game.calculate()
    }, game.interval);

    window.addEventListener("keydown", function(event) {
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
    });

    game.worker.onmessage = function(event) {
        if (event.data.startsWith("[DEBUG]"))
            console.log(event.data);
        else
            game.board.parse(event.data);
    };

});
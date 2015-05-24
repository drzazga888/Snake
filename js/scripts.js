String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

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
            cols: 12,
            rows: 8
        }
    });

	window.setInterval(function() {
		game.snake.move();
        game.worker.postMessage(game.board.stringify());
	}, 250);

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
        console.log(event.data);
    };

});
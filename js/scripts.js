var game;

$(document).ready(function(){
	startGame();
});

function startGame() {
	game = new Game("game-canvas", new Position(8, 12));
}

window.addEventListener("keydown", function(event) {
	event.preventDefault();
	switch (event.keyCode)
	{
		case 37:
			game.snake.move('left');
			break;
		case 38:
			game.snake.move('up');
			break;
		case 39:
			game.snake.move('right');
			break;
		case 40:
			game.snake.move('down');
			break;
	}
});
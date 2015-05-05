var game;

$(document).ready(function(){
	startGame();
});

function startGame() {
	game = new Game("game-canvas", new Position(8, 12));
	console.log(game);
}
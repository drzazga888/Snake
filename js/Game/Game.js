/**
* Konstruktor gry:
* - tworzy element canvas
* - oblicza szerokość pól na postawie szerokości i wysokości elementu canvas
* - inicjuje pola (board)
* - kładzie węża
* - kładzie jabłko na planszy
* - pierwsze malowanie planszy
*/
Game = function(canvasID, size) {
	// tworzy element canvas
	var canvas = document.getElementById(canvasID);
	var context = null;
	if (canvas.getContext)
		context = canvas.getContext('2d');
	else {
		console.error("Nie można było zainicjować elementu canvas.");
		return;
	}
	// oblicza szerokość pól na postawie szerokości i wysokości elementu canvas
	var scale = canvas.width / size.col;
	// inicjuje pola (board)
	this.board = new Board(context, size, scale);
	// kładzie węża
	this.snake = new Snake(board);
	// kładzie jabłko na planszy
	this.apple = new Apple(board);
	// pierwsze malowanie planszy
	this.draw();
};
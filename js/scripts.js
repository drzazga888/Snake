var game;

$(document).ready(function(){
    drawSnakeHead();
    drawSnakeBody();
    drawSnakeBodyCorner();
    drawSnakeTail();
    drawApple();
    game = new Game({
        canvasID: "game-canvas",
        size: {
            cols: 12,
            rows: 8
        }
    });
	window.setInterval(function() {
		game.snake.move();
	}, 300);
    window.addEventListener("keydown", function(event) {
        switch (event.keyCode) {
            case 65:
                game.snake.changeDirection('left');
                break;
            case 87:
                game.snake.changeDirection('up');
                break;
            case 68:
                game.snake.changeDirection('right');
                break;
            case 83:
                game.snake.changeDirection('down');
                break;
        }
    });
});

function drawSnakeHead() {
	var ctx = $("#snake-head")[0].getContext('2d');
	// ogólne style do ciała
	ctx.fillStyle = "#FFB357";
	ctx.strokeStyle = "#FFB357";
	ctx.lineWidth = 3;
	// malowanie prostokąta
	ctx.fillRect(50, 25, 50, 50);
	// malowanie owalu
	ctx.save();
	ctx.translate(20, 12.5);
	ctx.scale(1.2, 0.75);
	ctx.beginPath();	
	ctx.arc(40, 50, 40, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.restore();
	ctx.fill();
	// język
	ctx.beginPath();
	ctx.moveTo(22, 50);
	ctx.quadraticCurveTo(17, 60, 12, 50);
	ctx.quadraticCurveTo(7, 40, 2, 50);
	ctx.stroke();
	// oczy - czarne wypełnienie
	ctx.fillStyle = "#000";
	ctx.beginPath();
	ctx.arc(45, 40, 5, 0, Math.PI * 2, false);
	ctx.arc(45, 60, 5, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.fill();
	// oczy - błysk
	ctx.fillStyle = "#fff";
	ctx.beginPath();
	ctx.arc(47, 38, 1, 0, Math.PI * 2, false);
	ctx.arc(47, 58, 1, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.fill();
}

function drawSnakeBody() {
	var ctx = $("#snake-body")[0].getContext('2d');
	// ogólne style do ciała
	ctx.fillStyle = "#FFB357";
	// malowanie prostokąta
	ctx.fillRect(0, 25, 100, 50);
	// wzorek na wężu - styl wypełnienia
	ctx.fillStyle = "#c87";
	// pierwszy pręg
	ctx.beginPath();
	ctx.moveTo(15, 25);
	ctx.lineTo(25, 50);
	ctx.lineTo(35, 25);
	ctx.closePath();
	ctx.fill();
	// drugi pręg
	ctx.beginPath();
	ctx.moveTo(65, 75);
	ctx.lineTo(75, 50);
	ctx.lineTo(85, 75);
	ctx.closePath();
	ctx.fill();
}

function drawSnakeBodyCorner() {
	var ctx = $("#snake-body-corner")[0].getContext('2d');
	// ogólne style do ciała
	ctx.fillStyle = "#FFB357";
	// tworzenie maski przycinającej - zapamiętanie stanu
	ctx.save();
	// malowanie skręcającego ciałą węża (maska)
	ctx.beginPath();
	ctx.moveTo(0, 25);
	ctx.lineTo(25, 25);
	ctx.arcTo(75, 25, 75, 75, 50);
	ctx.lineTo(75, 100);
	ctx.lineTo(25, 100);
	ctx.lineTo(25, 90);
	ctx.arcTo(25, 75, 10, 75, 15);
	ctx.lineTo(0, 75);
	ctx.closePath();
	// maska + wypełnienie ciała
	ctx.clip();
	ctx.fill();
	// ust. wypełnienie pręgów
	ctx.fillStyle = "#c87";
	// pręg nr 1
	ctx.beginPath();
	ctx.moveTo(17, 10);
	ctx.lineTo(20, 50);
	ctx.lineTo(45, 20);
	ctx.closePath();
	ctx.fill();
	// pręg nr 2
	ctx.beginPath();
	ctx.moveTo(5, 75);
	ctx.lineTo(50, 75);
	ctx.lineTo(25, 95);
	ctx.closePath();
	ctx.fill();
	// wypełnienie
	ctx.restore();
}

function drawSnakeTail() {
	var ctx = $("#snake-tail")[0].getContext('2d');
	// ogólne style do ciała
	ctx.fillStyle = "#FFB357";
	// przycinanie
	ctx.save();
	// rysowanie ogona
	ctx.beginPath();
	ctx.moveTo(0, 25);
	ctx.lineTo(25, 25);
	ctx.bezierCurveTo(50, 25, 85, 50, 100, 50);
	ctx.bezierCurveTo(85, 50, 50, 75, 25, 75);
	ctx.lineTo(0, 75);
	ctx.closePath();
	// przycinanie
	ctx.clip();
	ctx.fill();
	// ust. wypełnienie pręgów
	ctx.fillStyle = "#c87";
	// pierwszy pręg
	ctx.beginPath();
	ctx.moveTo(15, 25);
	ctx.lineTo(25, 50);
	ctx.lineTo(35, 25);
	ctx.closePath();
	ctx.fill();
	// drugi pręg
	ctx.beginPath();
	ctx.moveTo(45, 75);
	ctx.lineTo(55, 50);
	ctx.lineTo(65, 75);
	ctx.closePath();
	ctx.fill();
	// przywracanie
	ctx.restore();
}

function drawApple() {
	var ctx = $("#apple")[0].getContext('2d');
	// główna część jabłka
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.moveTo(55, 25);
	ctx.bezierCurveTo(0, -5, -20, 95, 50, 95);
	ctx.bezierCurveTo(110, 95, 110, 5, 55, 25);
	ctx.closePath();
	ctx.fill();
	// refleksy świetlne
	var my_gradient = ctx.createLinearGradient(0, 25, 100, 95);
	my_gradient.addColorStop(0, "white");
	my_gradient.addColorStop(1, "red");
	ctx.fillStyle = my_gradient;
	ctx.beginPath();
	ctx.moveTo(50, 30);
	ctx.bezierCurveTo(10, 0, -20, 95, 65, 90);
	ctx.bezierCurveTo(10, 95, 20, 15, 50, 30);
	ctx.closePath();
	ctx.fill();
	// patyk
	ctx.strokeStyle = "black";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(55, 25);
	ctx.lineTo(57, 21);
	ctx.stroke();
	// liść
	ctx.fillStyle = "#0c0";
	ctx.beginPath();
	ctx.moveTo(57, 21);
	ctx.bezierCurveTo(55, 20, 50, 0, 80, 5);
	ctx.bezierCurveTo(80, 10, 80, 20, 57, 21);
	ctx.closePath();
	ctx.fill();
}
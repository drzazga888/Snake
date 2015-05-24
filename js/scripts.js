String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var game;

$(document).ready(function(){
    $(window).resize(function(){
        var maxWidth = $(this).width();
        var maxHeight = $(this).height();
        $("#game-canvas").css({
            maxWidth: Math.floor(maxWidth * 0.9) + "px",
            maxHeight: Math.floor(maxHeight * 0.9) + "px"
        });
    }).resize();
    game = new Game({
        canvasID: "game-canvas",
        size: {
            cols: 12,
            rows: 8
        }
    });
	window.setInterval(function() {
		game.snake.move();
	}, 200);
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
    drawObstacle($("#obstacle")[0].getContext("2d"));
    drawMouse($("#mouse")[0].getContext("2d"));
});

function drawObstacle(ctx) {
    ctx.fillStyle = "#af6c4b";
    ctx.fillRect(0, 0, 100, 100);
    for (var x = 10; x < 100; x += 20) {
        for (var y = 10; y < 100; y += 20) {
            ctx.fillStyle = "#842";
            ctx.beginPath();
            ctx.arc(x + 2, y + 2, 7, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "#c86";
            ctx.beginPath();
            ctx.arc(x - 1, y - 1, 7, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "#af6c4b";
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
        }
    }
}

function drawMouse(ctx) {
    ctx.fillStyle = "#cde";
    // ciało myszy
    ctx.beginPath();
    ctx.moveTo(15, 50);
    ctx.bezierCurveTo(15, 40, 20, 35, 35, 35);
    ctx.bezierCurveTo(50, 15, 85, 25, 85, 50);
    ctx.bezierCurveTo(85, 75, 50, 85, 35, 65);
    ctx.bezierCurveTo(20, 65, 15, 60, 15, 50);
    ctx.closePath();
    ctx.fill();
    // nos
    ctx.beginPath();
    ctx.arc(15, 50, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    // wąsy
    ctx.strokeStyle = "#cde";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(15, 50);
    ctx.lineTo(5, 60);
    ctx.moveTo(15, 50);
    ctx.lineTo(5, 40);
    ctx.moveTo(15, 50);
    ctx.lineTo(10, 35);
    ctx.moveTo(15, 50);
    ctx.lineTo(10, 65);
    ctx.moveTo(15, 50);
    ctx.lineTo(15, 35);
    ctx.moveTo(15, 50);
    ctx.lineTo(15, 65);
    ctx.stroke();
    // oczy
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(22, 45, 3, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(22, 55, 3, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    // ogon
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(85, 50);
    ctx.bezierCurveTo(110, 50, 75, 85, 97, 85);
    ctx.stroke();
    // nóżki
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(40, 25, 5, Math.PI * (-0.15), Math.PI * 0.8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(75, 25, 5, Math.PI * 0.2, Math.PI * 1.2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(40, 75, 5, Math.PI * 1.2, Math.PI * 2.15);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(75, 75, 5, Math.PI * 0.8, Math.PI * 1.8);
    ctx.stroke();
}
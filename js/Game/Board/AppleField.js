function AppleField(board, position) {
	Field.call(this, board, position);
}

AppleField.prototype = Object.create(Field.prototype);
AppleField.prototype.constructor = AppleField;

AppleField.prototype.draw = function() {
    Field.prototype.draw.call(this, AppleField.prototype.drawApple);
};

AppleField.prototype.drawApple = function() {
    // główna część jabłka
    this.board.ctx.fillStyle = "red";
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(55, 25);
    this.board.ctx.bezierCurveTo(0, -5, -20, 95, 50, 95);
    this.board.ctx.bezierCurveTo(110, 95, 110, 5, 55, 25);
    this.board.ctx.closePath();
    this.board.ctx.fill();
    // refleksy świetlne
    var my_gradient = this.board.ctx.createLinearGradient(0, 25, 100, 95);
    my_gradient.addColorStop(0, "white");
    my_gradient.addColorStop(0.5, "red");
    this.board.ctx.fillStyle = my_gradient;
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(50, 30);
    this.board.ctx.bezierCurveTo(10, 0, -20, 95, 65, 90);
    this.board.ctx.bezierCurveTo(10, 95, 20, 15, 50, 30);
    this.board.ctx.closePath();
    this.board.ctx.fill();
    // patyk
    this.board.ctx.strokeStyle = "black";
    this.board.ctx.lineWidth = 3;
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(55, 25);
    this.board.ctx.lineTo(57, 21);
    this.board.ctx.stroke();
    // liść
    this.board.ctx.fillStyle = "#0c0";
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(57, 21);
    this.board.ctx.bezierCurveTo(55, 20, 50, 0, 80, 5);
    this.board.ctx.bezierCurveTo(80, 10, 80, 20, 57, 21);
    this.board.ctx.closePath();
    this.board.ctx.fill();
};
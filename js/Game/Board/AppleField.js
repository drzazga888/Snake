function AppleField(ctx, position, id, peelColor, leafColor) {
	Field.call(this, ctx, position, id);
    this.peelColor = peelColor;
    this.leafColor = leafColor;
}

AppleField.prototype = Object.create(Field.prototype);
AppleField.prototype.constructor = AppleField;

AppleField.prototype.draw = function() {
    Field.prototype.draw.call(this, AppleField.prototype.drawApple);
};

AppleField.prototype.drawApple = function() {
    // główna część jabłka
    this.ctx.fillStyle = this.peelColor;
    this.ctx.beginPath();
    this.ctx.moveTo(55, 25);
    this.ctx.bezierCurveTo(0, -5, -20, 95, 50, 95);
    this.ctx.bezierCurveTo(110, 95, 110, 5, 55, 25);
    this.ctx.closePath();
    this.ctx.fill();
    // refleksy świetlne
    var my_gradient = this.ctx.createLinearGradient(0, 0, 100, 95);
    my_gradient.addColorStop(0, "white");
    my_gradient.addColorStop(0.5, this.peelColor);
    this.ctx.fillStyle = my_gradient;
    this.ctx.beginPath();
    this.ctx.moveTo(50, 30);
    this.ctx.bezierCurveTo(10, 0, -20, 95, 65, 90);
    this.ctx.bezierCurveTo(10, 95, 20, 15, 50, 30);
    this.ctx.closePath();
    this.ctx.fill();
    // patyk
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(55, 25);
    this.ctx.lineTo(57, 21);
    this.ctx.stroke();
    // liść
    this.ctx.fillStyle = this.leafColor;
    this.ctx.beginPath();
    this.ctx.moveTo(57, 21);
    this.ctx.bezierCurveTo(55, 20, 50, 0, 80, 5);
    this.ctx.bezierCurveTo(80, 10, 80, 20, 57, 21);
    this.ctx.closePath();
    this.ctx.fill();
};
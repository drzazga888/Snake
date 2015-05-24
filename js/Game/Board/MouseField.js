function MouseField(ctx, position, orientation) {
    Field.call(this, ctx, position, MouseField.orientationToId(orientation));
    this.orientation = orientation;
}

MouseField.prototype = Object.create(Field.prototype);
MouseField.prototype.constructor = MouseField;

MouseField.prototype.draw = function() {
    Field.prototype.draw.call(this, MouseField.prototype.drawMouse);
};

MouseField.orientationToId = function(orientation) {
    switch (orientation) {
        case "right":
            return 6;
        case "left":
            return 7;
        case "up":
            return 8;
        case "down":
            return 9;
    }
};

MouseField.prototype.draw = function() {
    switch (this.orientation) {
        case "left":
            Field.prototype.draw.call(this, MouseField.prototype.drawMouse);
            break;
        case "up":
            Field.prototype.draw.call(this, MouseField.prototype.drawMouse, Math.PI * 0.5);
            break;
        case "right":
            Field.prototype.draw.call(this, MouseField.prototype.drawMouse, Math.PI);
            break;
        case "down":
            Field.prototype.draw.call(this, MouseField.prototype.drawMouse, Math.PI * 1.5);
            break;
    }
};

MouseField.prototype.drawMouse = function() {
    this.ctx.fillStyle = "#cde";
    // ciało myszy
    this.ctx.beginPath();
    this.ctx.moveTo(15, 50);
    this.ctx.bezierCurveTo(15, 40, 20, 35, 35, 35);
    this.ctx.bezierCurveTo(50, 15, 85, 25, 85, 50);
    this.ctx.bezierCurveTo(85, 75, 50, 85, 35, 65);
    this.ctx.bezierCurveTo(20, 65, 15, 60, 15, 50);
    this.ctx.closePath();
    this.ctx.fill();
    // nos
    this.ctx.beginPath();
    this.ctx.arc(15, 50, 5, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
    // wąsy
    this.ctx.strokeStyle = "#cde";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(15, 50);
    this.ctx.lineTo(5, 60);
    this.ctx.moveTo(15, 50);
    this.ctx.lineTo(5, 40);
    this.ctx.moveTo(15, 50);
    this.ctx.lineTo(10, 35);
    this.ctx.moveTo(15, 50);
    this.ctx.lineTo(10, 65);
    this.ctx.moveTo(15, 50);
    this.ctx.lineTo(15, 35);
    this.ctx.moveTo(15, 50);
    this.ctx.lineTo(15, 65);
    this.ctx.stroke();
    // oczy
    this.ctx.fillStyle = "#000";
    this.ctx.beginPath();
    this.ctx.arc(22, 45, 3, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(22, 55, 3, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
    // ogon
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(85, 50);
    this.ctx.bezierCurveTo(110, 50, 75, 85, 97, 85);
    this.ctx.stroke();
    // nóżki
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(40, 25, 5, Math.PI * (-0.15), Math.PI * 0.8);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(75, 25, 5, Math.PI * 0.2, Math.PI * 1.2);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(40, 75, 5, Math.PI * 1.2, Math.PI * 2.15);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(75, 75, 5, Math.PI * 0.8, Math.PI * 1.8);
    this.ctx.stroke();
};
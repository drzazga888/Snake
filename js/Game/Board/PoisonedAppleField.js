function PoisonedAppleField(ctx, position) {
    AppleField.call(this, ctx, position, "#624C20", "#980");
}

PoisonedAppleField.prototype = Object.create(AppleField.prototype);
PoisonedAppleField.prototype.constructor = PoisonedAppleField;

PoisonedAppleField.prototype.drawApple = function() {
    AppleField.prototype.drawApple.call(this);
    this.ctx.fillStyle = "#433";
    this.ctx.beginPath();
    this.ctx.arc(60, 60, 12, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(70, 65, 8, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(40, 40, 5, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
};

PoisonedAppleField.prototype.draw = function() {
    Field.prototype.draw.call(this, PoisonedAppleField.prototype.drawApple);
};
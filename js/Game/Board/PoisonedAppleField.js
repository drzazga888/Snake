/**
 * Obiekt przedstawia zatrute jabłko na planszy
 * @param ctx - obiekt CanvasRenderingContext2D, który używa się do rysowania
 * @param position - obiekt, który zawiera pole col i row, jest to pozycja pola na planszy
 * @constructor
 */
function PoisonedAppleField(ctx, position) {
    AppleField.call(this, ctx, position, 4, "#624C20", "#980");
}

/**
 * Realizowanie dziedziczenia obiektu PoisonedEmptyField po AppleField
 * @type {AppleField}
 */
PoisonedAppleField.prototype = Object.create(AppleField.prototype);
PoisonedAppleField.prototype.constructor = PoisonedAppleField;

/**
 * Metoda pomocnicza używana przez metodę draw(), maluje jabłko na płótnie (canvas)
 */
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

/**
 * Metoda wywoływana do narysowania kształtu
 */
PoisonedAppleField.prototype.draw = function() {
    Field.prototype.draw.call(this, PoisonedAppleField.prototype.drawApple);
};
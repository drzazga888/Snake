/**
 * Jest to pole przedstawiające przeszkodę na planszy
 * @param ctx - obiekt CanvasRenderingContext2D, który używa się do rysowania
 * @param position - obiekt, który zawiera pole col i row, jest to pozycja pola na planszy
 * @constructor
 */
function ObstacleField(ctx, position) {
    Field.call(this, ctx, position, 5);
}

/**
 * Realizowanie dziedziczenia obiektu EmptyField po Field
 * @type {Field}
 */
ObstacleField.prototype = Object.create(Field.prototype);
ObstacleField.prototype.constructor = ObstacleField;

/**
 * Metoda wywoływana do narysowania kształtu
 */
ObstacleField.prototype.draw = function() {
    Field.prototype.draw.call(this, ObstacleField.prototype.drawObstacle);
};

/**
 * Metoda pomocnicza używana przez metodę draw(), maluje przeszkodę na płótnie (canvas)
 */
ObstacleField.prototype.drawObstacle = function() {
    this.ctx.fillStyle = "#af6c4b";
    this.ctx.fillRect(0, 0, 100, 100);
    for (var x = 10; x < 100; x += 20) {
        for (var y = 10; y < 100; y += 20) {
            this.ctx.fillStyle = "#842";
            this.ctx.beginPath();
            this.ctx.arc(x + 2, y + 2, 7, 0, Math.PI * 2, false);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.fillStyle = "#c86";
            this.ctx.beginPath();
            this.ctx.arc(x - 1, y - 1, 7, 0, Math.PI * 2, false);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.fillStyle = "#af6c4b";
            this.ctx.beginPath();
            this.ctx.arc(x, y, 7, 0, Math.PI * 2, false);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }
};
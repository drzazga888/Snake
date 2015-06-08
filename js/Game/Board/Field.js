/**
 * Field jest to obiekt, po którym dziedziczą inne pola na planszy
 * @param ctx - obiekt CanvasRenderingContext2D, który używa się do rysowania
 * @param position - obiekt, który zawiera pole col i row, jest to pozycja pola na planszy
 * @param id - nr ID, który jest używany do konwersji tego pola na liczbę, gdy chcemy przesłać planszę do WebWorkera
 * @constructor
 */
function Field(ctx, position, id) {
	this.ctx = ctx;
	this.position = position;
    this.id = id;
}

/**
 * Metoda rysuje określony kształt na planszy
 * @param drawingFunction - funkcja rysująca zadany kształt
 * @param rotation - obrót rysowanego obiektu, w radianach
 */
Field.prototype.draw = function(drawingFunction, rotation) {
    this.ctx.clearRect(
        this.position.col * 100,
        this.position.row * 100,
        100,
        100
    );
    if (drawingFunction !== undefined) {
        this.ctx.save();
        this.ctx.translate(this.position.col * 100, this.position.row * 100);
        if (rotation !== undefined) {
            this.ctx.translate(50, 50);
            this.ctx.rotate(rotation);
            this.ctx.translate(-50, -50);
        }
        drawingFunction.call(this);
        this.ctx.restore();
    }
};
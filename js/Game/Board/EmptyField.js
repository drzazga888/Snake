/**
 * EmptyField reprezentuje puste pole na planszy
 * @param ctx - obiekt CanvasRenderingContext2D, który się używa do rysowania
 * @param position - obiekt, który zawiera pole col i row, jest to pozycja pola na planszy
 * @constructor
 */
function EmptyField(ctx, position) {
	Field.call(this, ctx, position, 0);
}

/**
 * Realizowanie dziedziczenia obiektu EmptyField po Field
 * @type {Field}
 */
EmptyField.prototype = Object.create(Field.prototype);
EmptyField.prototype.constructor = EmptyField;

/**
 * Metoda wywoływana do narysowania kształtu
 */
EmptyField.prototype.draw = function() {
    Field.prototype.draw.call(this);
};
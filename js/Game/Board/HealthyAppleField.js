/**
 * Obiekt ten przedstawia zdrowe jabłko na planszy
 * @param ctx - obiekt CanvasRenderingContext2D, który używa się do rysowania
 * @param position - obiekt, który zawiera pole col i row, jest to pozycja pola na planszy
 * @constructor
 */
function HealthyAppleField(ctx, position) {
    AppleField.call(this, ctx, position, 3, "red", "#0c0");
}

/**
 * Realizowanie dziedziczenia obiektu HealthyAppleField po AppleField
 * @type {AppleField}
 */
HealthyAppleField.prototype = Object.create(AppleField.prototype);
HealthyAppleField.prototype.constructor = HealthyAppleField;
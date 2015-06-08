/**
 * Obiekt reprezentuje określoną część ciała węża na planszy
 * @param ctx - obiekt CanvasRenderingContext2D, który używa się do rysowania
 * @param position - obiekt, który zawiera pole col i row, jest to pozycja pola na planszy
 * @param orientation - orientacja części ciała węża, możliwe wartości:
 *  - "up"
 *  - "down"
 *  - "left"
 *  - "right"
 *  - kombinacje [param1]-[param2] np "up-left", używane do zagięć ciała węża
 * @param spriteType - typ części ciała:
 *  - "head" - głowa
 *  - "body" - dowolny odcinek pomiędzy głową a ogonem
 *  - "tail" - ogon
 * @param part - określony odcinek węża
 * @constructor
 */
function SnakeField(ctx, position, orientation, spriteType, part) {
	Field.call(this, ctx, position, spriteType == "head" ? 2 : 1);
    this.spriteType = spriteType;
    this.orientation = orientation;
	this.part = part;
}

/**
 * Realizowanie dziedziczenia obiektu SnakeField po Field
 * @type {AppleField}
 */
SnakeField.prototype = Object.create(Field.prototype);
SnakeField.prototype.constructor = SnakeField;

/**
 * Metoda wywoływana do narysowania kształtu
 */
SnakeField.prototype.draw = function() {
    switch (this.spriteType) {
        case "head":
            if (this.orientation == "left")
                Field.prototype.draw.call(this, SnakeField.prototype.drawHead);
            else if (this.orientation == "up")
                Field.prototype.draw.call(this, SnakeField.prototype.drawHead, Math.PI * 0.5);
            else if (this.orientation == "right")
                Field.prototype.draw.call(this, SnakeField.prototype.drawHead, Math.PI);
            else if (this.orientation == "down")
                Field.prototype.draw.call(this, SnakeField.prototype.drawHead, Math.PI * 1.5);
            break;
        case "body":
            if (this.orientation == "right-down" || this.orientation == "up-left")
                Field.prototype.draw.call(this, SnakeField.prototype.drawBodyCorner);
            else if (this.orientation == "right-up" || this.orientation == "down-left")
                Field.prototype.draw.call(this, SnakeField.prototype.drawBodyCorner, Math.PI * 0.5);
            else if (this.orientation == "left-up" || this.orientation == "down-right")
                Field.prototype.draw.call(this, SnakeField.prototype.drawBodyCorner, Math.PI);
            else if (this.orientation == "left-down" || this.orientation == "up-right")
                Field.prototype.draw.call(this, SnakeField.prototype.drawBodyCorner, Math.PI * 1.5);
            else if (this.orientation == "left" || this.orientation == "right")
                Field.prototype.draw.call(this, SnakeField.prototype.drawBody);
            else if (this.orientation == "up" || this.orientation == "down")
                Field.prototype.draw.call(this, SnakeField.prototype.drawBody, Math.PI * 0.5);
            break;
        case "tail":
            if (this.orientation.endsWith("left"))
                Field.prototype.draw.call(this, SnakeField.prototype.drawTail);
            else if (this.orientation.endsWith("up"))
                Field.prototype.draw.call(this, SnakeField.prototype.drawTail, Math.PI * 0.5);
            else if (this.orientation.endsWith("right"))
                Field.prototype.draw.call(this, SnakeField.prototype.drawTail, Math.PI);
            else if (this.orientation.endsWith("down"))
                Field.prototype.draw.call(this, SnakeField.prototype.drawTail, Math.PI * 1.5);
            break;
    }
};

/**
 * Metoda pomocnicza do rysowania głowy węża
 */
SnakeField.prototype.drawHead = function() {
    // ogólne style do ciała
    this.ctx.fillStyle = "#FFB357";
    this.ctx.strokeStyle = "#FFB357";
    this.ctx.lineWidth = 3;
    // malowanie prostokąta
    this.ctx.fillRect(50, 25, 50, 50);
    // malowanie owalu
    this.ctx.save();
    this.ctx.rect(0, 0, 100, 100);
    this.ctx.clip();
    this.ctx.beginPath();
    this.ctx.moveTo(115, 50);
    this.ctx.bezierCurveTo(115, 10, 20, 10, 20, 50);
    this.ctx.bezierCurveTo(20, 90, 115, 90, 115, 50);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
    // język
    this.ctx.beginPath();
    this.ctx.moveTo(22, 50);
    this.ctx.quadraticCurveTo(17, 60, 12, 50);
    this.ctx.quadraticCurveTo(7, 40, 2, 50);
    this.ctx.stroke();
    // oczy - czarne wypełnienie
    this.ctx.fillStyle = "#000";
    this.ctx.beginPath();
    this.ctx.arc(45, 40, 5, 0, Math.PI * 2, false);
    this.ctx.arc(45, 60, 5, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
    // oczy - błysk
    this.ctx.fillStyle = "#fff";
    this.ctx.beginPath();
    this.ctx.arc(47, 38, 1, 0, Math.PI * 2, false);
    this.ctx.arc(47, 58, 1, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
};

/**
 * Metoda pomocnicza do rysowania nizagiętej części ciała węża
 */
SnakeField.prototype.drawBody = function() {
    // ogólne style do ciała
    this.ctx.fillStyle = "#FFB357";
    // malowanie prostokąta
    this.ctx.fillRect(0, 25, 100, 50);
    // wzorek na wężu - styl wypełnienia
    this.ctx.fillStyle = "#c87";
    // pierwszy pręg
    this.ctx.beginPath();
    this.ctx.moveTo(15, 25);
    this.ctx.lineTo(25, 50);
    this.ctx.lineTo(35, 25);
    this.ctx.closePath();
    this.ctx.fill();
    // drugi pręg
    this.ctx.beginPath();
    this.ctx.moveTo(65, 75);
    this.ctx.lineTo(75, 50);
    this.ctx.lineTo(85, 75);
    this.ctx.closePath();
    this.ctx.fill();
};

/**
 * Metoda pomocnicza do rysowania zagiętej części ciała węża
 */
SnakeField.prototype.drawBodyCorner = function() {
    // ogólne style do ciała
    this.ctx.fillStyle = "#FFB357";
    // tworzenie maski przycinającej - zapamiętanie stanu
    this.ctx.save();
    // malowanie skręcającego ciałą węża (maska)
    this.ctx.beginPath();
    this.ctx.moveTo(0, 25);
    this.ctx.lineTo(25, 25);
    this.ctx.arcTo(75, 25, 75, 75, 50);
    this.ctx.lineTo(75, 100);
    this.ctx.lineTo(25, 100);
    this.ctx.lineTo(25, 90);
    this.ctx.arcTo(25, 75, 10, 75, 15);
    this.ctx.lineTo(0, 75);
    this.ctx.closePath();
    // maska + wypełnienie ciała
    this.ctx.clip();
    this.ctx.fill();
    // ust. wypełnienie pręgów
    this.ctx.fillStyle = "#c87";
    // pręg nr 1
    this.ctx.beginPath();
    this.ctx.moveTo(17, 10);
    this.ctx.lineTo(20, 50);
    this.ctx.lineTo(45, 20);
    this.ctx.closePath();
    this.ctx.fill();
    // pręg nr 2
    this.ctx.beginPath();
    this.ctx.moveTo(5, 75);
    this.ctx.lineTo(50, 75);
    this.ctx.lineTo(25, 95);
    this.ctx.closePath();
    this.ctx.fill();
    // wypełnienie
    this.ctx.restore();
};

/**
 * Metoda pomocnicza do rysowania nizagiętej ogona
 */
SnakeField.prototype.drawTail = function() {
    // ogólne style do ciała
    this.ctx.fillStyle = "#FFB357";
    // przycinanie
    this.ctx.save();
    // rysowanie ogona
    this.ctx.beginPath();
    this.ctx.moveTo(0, 25);
    this.ctx.lineTo(25, 25);
    this.ctx.bezierCurveTo(50, 25, 85, 50, 100, 50);
    this.ctx.bezierCurveTo(85, 50, 50, 75, 25, 75);
    this.ctx.lineTo(0, 75);
    this.ctx.closePath();
    // przycinanie
    this.ctx.clip();
    this.ctx.fill();
    // ust. wypełnienie pręgów
    this.ctx.fillStyle = "#c87";
    // pierwszy pręg
    this.ctx.beginPath();
    this.ctx.moveTo(15, 25);
    this.ctx.lineTo(25, 50);
    this.ctx.lineTo(35, 25);
    this.ctx.closePath();
    this.ctx.fill();
    // drugi pręg
    this.ctx.beginPath();
    this.ctx.moveTo(45, 75);
    this.ctx.lineTo(55, 50);
    this.ctx.lineTo(65, 75);
    this.ctx.closePath();
    this.ctx.fill();
    // przywracanie
    this.ctx.restore();
};
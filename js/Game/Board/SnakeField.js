function SnakeField(board, position, spriteType, orientation, part) {
	Field.call(this, board, position);
    this.spriteType = spriteType;
    this.orientation = orientation;
	this.part = part;
}

SnakeField.prototype = Object.create(Field.prototype);
SnakeField.prototype.constructor = SnakeField;

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

SnakeField.prototype.drawHead = function() {
    // ogólne style do ciała
    this.board.ctx.fillStyle = "#FFB357";
    this.board.ctx.strokeStyle = "#FFB357";
    this.board.ctx.lineWidth = 3;
    // malowanie prostokąta
    this.board.ctx.fillRect(50, 25, 50, 50);
    // malowanie owalu
    this.board.ctx.save();
    this.board.ctx.rect(0, 0, 100, 100);
    this.board.ctx.clip();
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(115, 50);
    this.board.ctx.bezierCurveTo(115, 10, 20, 10, 20, 50);
    this.board.ctx.bezierCurveTo(20, 90, 115, 90, 115, 50);
    this.board.ctx.closePath();
    this.board.ctx.fill();
    this.board.ctx.restore();
    // język
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(22, 50);
    this.board.ctx.quadraticCurveTo(17, 60, 12, 50);
    this.board.ctx.quadraticCurveTo(7, 40, 2, 50);
    this.board.ctx.stroke();
    // oczy - czarne wypełnienie
    this.board.ctx.fillStyle = "#000";
    this.board.ctx.beginPath();
    this.board.ctx.arc(45, 40, 5, 0, Math.PI * 2, false);
    this.board.ctx.arc(45, 60, 5, 0, Math.PI * 2, false);
    this.board.ctx.closePath();
    this.board.ctx.fill();
    // oczy - błysk
    this.board.ctx.fillStyle = "#fff";
    this.board.ctx.beginPath();
    this.board.ctx.arc(47, 38, 1, 0, Math.PI * 2, false);
    this.board.ctx.arc(47, 58, 1, 0, Math.PI * 2, false);
    this.board.ctx.closePath();
    this.board.ctx.fill();
};

SnakeField.prototype.drawBody = function() {
    // ogólne style do ciała
    this.board.ctx.fillStyle = "#FFB357";
    // malowanie prostokąta
    this.board.ctx.fillRect(0, 25, 100, 50);
    // wzorek na wężu - styl wypełnienia
    this.board.ctx.fillStyle = "#c87";
    // pierwszy pręg
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(15, 25);
    this.board.ctx.lineTo(25, 50);
    this.board.ctx.lineTo(35, 25);
    this.board.ctx.closePath();
    this.board.ctx.fill();
    // drugi pręg
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(65, 75);
    this.board.ctx.lineTo(75, 50);
    this.board.ctx.lineTo(85, 75);
    this.board.ctx.closePath();
    this.board.ctx.fill();
};

SnakeField.prototype.drawBodyCorner = function() {
    // ogólne style do ciała
    this.board.ctx.fillStyle = "#FFB357";
    // tworzenie maski przycinającej - zapamiętanie stanu
    this.board.ctx.save();
    // malowanie skręcającego ciałą węża (maska)
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(0, 25);
    this.board.ctx.lineTo(25, 25);
    this.board.ctx.arcTo(75, 25, 75, 75, 50);
    this.board.ctx.lineTo(75, 100);
    this.board.ctx.lineTo(25, 100);
    this.board.ctx.lineTo(25, 90);
    this.board.ctx.arcTo(25, 75, 10, 75, 15);
    this.board.ctx.lineTo(0, 75);
    this.board.ctx.closePath();
    // maska + wypełnienie ciała
    this.board.ctx.clip();
    this.board.ctx.fill();
    // ust. wypełnienie pręgów
    this.board.ctx.fillStyle = "#c87";
    // pręg nr 1
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(17, 10);
    this.board.ctx.lineTo(20, 50);
    this.board.ctx.lineTo(45, 20);
    this.board.ctx.closePath();
    this.board.ctx.fill();
    // pręg nr 2
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(5, 75);
    this.board.ctx.lineTo(50, 75);
    this.board.ctx.lineTo(25, 95);
    this.board.ctx.closePath();
    this.board.ctx.fill();
    // wypełnienie
    this.board.ctx.restore();
};

SnakeField.prototype.drawTail = function() {
    // ogólne style do ciała
    this.board.ctx.fillStyle = "#FFB357";
    // przycinanie
    this.board.ctx.save();
    // rysowanie ogona
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(0, 25);
    this.board.ctx.lineTo(25, 25);
    this.board.ctx.bezierCurveTo(50, 25, 85, 50, 100, 50);
    this.board.ctx.bezierCurveTo(85, 50, 50, 75, 25, 75);
    this.board.ctx.lineTo(0, 75);
    this.board.ctx.closePath();
    // przycinanie
    this.board.ctx.clip();
    this.board.ctx.fill();
    // ust. wypełnienie pręgów
    this.board.ctx.fillStyle = "#c87";
    // pierwszy pręg
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(15, 25);
    this.board.ctx.lineTo(25, 50);
    this.board.ctx.lineTo(35, 25);
    this.board.ctx.closePath();
    this.board.ctx.fill();
    // drugi pręg
    this.board.ctx.beginPath();
    this.board.ctx.moveTo(45, 75);
    this.board.ctx.lineTo(55, 50);
    this.board.ctx.lineTo(65, 75);
    this.board.ctx.closePath();
    this.board.ctx.fill();
    // przywracanie
    this.board.ctx.restore();
};